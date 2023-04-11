import { Document, Schema } from 'mongoose';

interface CreditCard {
  cc_number: string;
  ballance: number;
}

export enum CustomerStatus {
  INACTIVE, ACTIVE
}

export interface Customer extends Document {
  readonly first_name: string;
  readonly last_name: string;
  readonly api_key: string;
  readonly credit_card: CreditCard;
  readonly status: CustomerStatus;
}

export const CustomerSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  api_key: { type: String },
  credit_card: {
    cc_number: {
      type: String,
    },
    ballance: {
      type: Number,
    },
  },
  status: {
    type: Number,
    enum: CustomerStatus
  }
});
