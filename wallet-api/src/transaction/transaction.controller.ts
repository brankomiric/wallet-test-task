import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
} from '@nestjs/common';
import { Transaction } from './dtos/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('api/transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async getCustomer(
    @Headers('api_key') apiKey: string,
    @Body() transactions: Transaction[],
  ) {
    if (apiKey != process.env.API_KEY) {
      throw new BadRequestException('Invalid Api Key');
    }
    const sortedTransactions =
      this.transactionService.sortTransactions(transactions);
    const chunksCount = await this.transactionService.enqueueTransactions(
      sortedTransactions,
    );
    return { message: `Sent ${chunksCount} chunks to processor` };
  }
}
