import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { customersProviders } from './api/customer.provider';
import { CustomerService } from './api/customer.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ApiModule, DatabaseModule],
  providers: [CustomerService, ...customersProviders],
})
export class AppModule {}
