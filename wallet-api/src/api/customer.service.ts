import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Customer, CustomerStatus } from './schemas/customer.schema';
import { Customer as CustomerDto } from './dtos/customer.dto';
import { CustomerUpdate } from './dtos/customer-update.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_MODEL') private readonly customerModel: Model<Customer>,
  ) {}

  async getCustomerById(id: string, apiKey: string) {
    const result = await this.customerModel.findOne({
      _id: id,
      status: CustomerStatus.ACTIVE,
    });
    if (!result) {
      throw new NotFoundException(`Customer id ${id} doesn't exist`);
    }
    if (apiKey && process.env.API_KEY != apiKey) {
      throw new BadRequestException('Incorrect Api Key');
    }
    const output: CustomerDto = {
      name: `${result.first_name} ${result.last_name}`,
    };
    apiKey ? (output.ballance = result.credit_card.ballance) : null;

    return output;
  }

  async deleteCustomer(id: string) {
    await this.customerModel.findByIdAndUpdate(id, {
      status: CustomerStatus.INACTIVE,
    });

    return { message: 'Archived customer' };
  }

  async updateCustomer(id: string, input: CustomerUpdate) {
    const query: any = {};
    if (input.name) {
      const parts = input.name.split(' ');
      query.first_name = parts[0];
      query.last_name = parts[1];
    }
    if (input.ballance) {
      query.credit_card = {};
      query.credit_card.ballance = +input.ballance;
    }
    const result = await this.customerModel.findOneAndUpdate(
      { _id: id, status: CustomerStatus.ACTIVE },
      { ...query },
      { new: true },
    );

    const output: CustomerDto = {
      name: `${result.first_name} ${result.last_name}`,
      ballance: result.credit_card.ballance,
    };

    return output;
  }
}
