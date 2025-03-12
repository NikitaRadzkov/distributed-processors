import { Client } from 'pg';
import { env } from '../../config/env';
import { logger } from '../../libs/logger';

export class DatabaseClient {
    private static instance: DatabaseClient;
    private client: Client;

    private constructor() {
        this.client = new Client({
            user: env.DB_USER,
            host: env.DB_HOST,
            database: env.DB_NAME,
            password: env.DB_PASSWORD,
            port: env.DB_PORT,
        });
    }

    public static getInstance(): DatabaseClient {
        if (!DatabaseClient.instance) {
            DatabaseClient.instance = new DatabaseClient();
        }
        return DatabaseClient.instance;
    }

    public async connect() {
        try {
            await this.client.connect();
            logger.info('Connected to the database');
        } catch (error) {
            logger.error('Failed to connect to the database', error);
            throw error;
        }
    }

    public getClient(): Client {
        return this.client;
    }

    public async end() {
        try {
            await this.client.end();
            logger.info('Disconnected from the database');
        } catch (error) {
            logger.error('Failed to disconnect from the database', error);
            throw error;
        }
    }
}
