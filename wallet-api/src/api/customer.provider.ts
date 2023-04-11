import { Mongoose } from 'mongoose';
import { CustomerSchema } from './schemas/customer.schema';

export const customersProviders = [
  {
    provide: 'CUSTOMER_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Customer', CustomerSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
