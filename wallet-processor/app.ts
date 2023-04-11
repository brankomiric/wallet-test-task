import { Job, Worker } from 'bullmq';
import * as dotenv from 'dotenv';
import db from './connection';
import { JobProcessor } from './services/jobProcessor';

dotenv.config();

(async () => {
    await db.connect();

    console.log('Booting up queue consumer...');

    const worker = new Worker(
        'TransactionQueue',
        async (job) => {
            await processJob(job);
        },
        {
            connection: {
                host: process.env.REDIS_HOST,
                port: +process.env.REDIS_PORT! || 6379,
            },
        },
    );

    const processJob = async (job: Job) => {
        const processor = new JobProcessor(job);
        await processor.processJob();
    };
})();
