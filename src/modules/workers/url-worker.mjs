import { parentPort, workerData } from 'worker_threads';
import axios from 'axios';

const { url, id } = workerData;

(async () => {
    try {
        const response = await axios.get(url);
        parentPort?.postMessage({ id, status: 'DONE', http_code: response.status });
    } catch (error) {
        parentPort?.postMessage({ id, status: 'ERROR', http_code: null });
    }
})();
