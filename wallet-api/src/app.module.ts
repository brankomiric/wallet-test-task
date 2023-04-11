import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { customersProviders } from './api/customer.provider';
import { CustomerService } from './api/customer.service';
import { DatabaseModule } from './database/database.module';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [ApiModule, DatabaseModule],
  providers: [CustomerService, ...customersProviders, TransactionService],
  controllers: [TransactionController],
})
export class AppModule {}
