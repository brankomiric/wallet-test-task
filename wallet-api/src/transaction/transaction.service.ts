import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from './dtos/transaction.dto';

@Injectable()
export class TransactionService {
  private queue = new Queue('TransactionQueue', {
    connection: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    },
  });

  sortTransactions(transactions: Transaction[]) {
    const latencyLimit = 1000;
    const data = transactions.sort((a, b) => {
      if (a.value > b.value) {
        return -1;
      }
      if (a.value < b.value) {
        return 1;
      }
      return 0;
    });
    const result = data.reduce((r: Transaction[][], o) => {
      const temp = r.find(
        (a) =>
          a.reduce((s, { latency }) => s + latency, 0) + o.latency <=
          latencyLimit,
      );
      if (temp) temp.push(o);
      else r.push([o]);
      return r;
    }, []);

    return result.sort((a, b) => {
      if (
        a.map((i) => i.value).reduce((c, d) => c + d) >
        b.map((i) => i.value).reduce((c, d) => c + d)
      ) {
        return -1;
      }
      if (
        a.map((i) => i.value).reduce((c, d) => c + d) <
        b.map((i) => i.value).reduce((c, d) => c + d)
      ) {
        return 1;
      }
      return 0;
    });
  }

  async enqueueTransactions(transactions: Transaction[][]) {
    const queueInput = transactions.map((t) => {
      return {
        name: uuidv4(),
        data: t,
      };
    });
    const response = await this.queue.addBulk(queueInput);
    return response.length;
  }
}
