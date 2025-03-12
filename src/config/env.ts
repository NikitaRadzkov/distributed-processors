import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT', 'BATCH_SIZE'];

export const checkEnvVars = () => {
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Environment variable ${envVar} is missing`);
        }
    }
};

export const env = {
    DB_USER: process.env.DB_USER!,
    DB_HOST: process.env.DB_HOST!,
    DB_NAME: process.env.DB_NAME!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
    DB_PORT: parseInt(process.env.DB_PORT || '5432'),
    BATCH_SIZE: parseInt(process.env.BATCH_SIZE || '5'),
};
