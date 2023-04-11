import { model, Schema } from 'mongoose';

interface CreditCard {
    cc_number: string;
    ballance: number;
}

export enum CustomerStatus {
    INACTIVE,
    ACTIVE,
}

export interface ICustomer {
    readonly first_name: string;
    readonly last_name: string;
    readonly credit_card: CreditCard;
    readonly status: CustomerStatus;
}

const customerSchema = new Schema<ICustomer>({
    first_name: { type: String },
    last_name: { type: String },
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
        enum: CustomerStatus,
    },
});

export const Customer = model<ICustomer>('Customer', customerSchema);
