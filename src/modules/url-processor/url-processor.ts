import { DatabaseClient } from '../database';
import { logger } from '../../libs/logger';
import { Worker } from 'worker_threads';
import path from 'path';
import { env } from '../../config/env';

export class URLProcessor {
    private dbClient = DatabaseClient.getInstance().getClient();

    async getNextTasks(batchSize: number) {
        const res = await this.dbClient.query(
            `SELECT * FROM urls WHERE status = 'NEW' LIMIT $1 FOR UPDATE SKIP LOCKED`,
            [batchSize]
        );
        return res.rows;
    }

    async startProcessing(batchSize: number = env.BATCH_SIZE) {
        await DatabaseClient.getInstance().connect();

        while (true) {
            const tasks = await this.getNextTasks(batchSize);
            if (tasks.length === 0) {
                logger.info('No more tasks to process.');
                break;
            }

            logger.info(`Processing ${tasks.length} URLs in parallel using Worker Threads...`);

            const workers = tasks.map(task => {
                return new Promise<void>((resolve, reject) => {
                    const worker = new Worker(path.resolve(__dirname, '../workers/url-worker.mjs'), {
                        workerData: { url: task.url, id: task.id },
                    });

                    worker.on('message', async (message) => {
                        const { id, status, http_code } = message;

                        await this.dbClient.query(
                            `UPDATE urls SET status = $1, http_code = $2 WHERE id = $3`,
                            [status, http_code, id]
                        );

                        logger.info(`Processed URL with ID ${id}: Status = ${status}, HTTP Code = ${http_code}`);
                        resolve();
                    });

                    worker.on('error', (error) => {
                        logger.error(`Worker error for URL ID ${task.id}:`, error);
                        reject(error);
                    });

                    worker.on('exit', (code) => {
                        if (code !== 0) {
                            logger.error(`Worker for URL ID ${task.id} stopped with exit code ${code}`);
                            reject(new Error(`Worker stopped with exit code ${code}`));
                        }
                    });
                });
            });

            await Promise.all(workers);
        }

        await DatabaseClient.getInstance().end();
    }
}