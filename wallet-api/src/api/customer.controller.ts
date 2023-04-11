import { Controller, Get, Param, Headers, Delete, Patch, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerUpdate } from './dtos/customer-update.dto';

@Controller('api/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/:id')
  getCustomer(@Param('id') id: string, @Headers('api_key') apiKey: string) {
    return this.customerService.getCustomerById(id, apiKey);
  }

  @Delete('/:id')
  deleteCustomer(@Param('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }

  @Patch('/:id')
  updateCustomer(@Param('id') id: string, @Body() updateInfo: CustomerUpdate) {
    return this.customerService.updateCustomer(id, updateInfo);
  }
}
