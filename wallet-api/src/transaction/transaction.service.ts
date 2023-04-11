import { Injectable } from '@nestjs/common';
import { Transaction } from './dtos/transaction.dto';

@Injectable()
export class TransactionService {
    
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
}
