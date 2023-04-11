import { model, Schema } from 'mongoose';

export interface ITransaction {
    readonly value: number;
    readonly latency: number;
    readonly customer_id: string;
    success: boolean;
}

const transactionSchema = new Schema<ITransaction>(
    {
        value: {
            type: Number,
            required: true,
        },
        latency: {
            type: Number,
            required: true,
        },
        customer_id: {
            type: String,
            required: true,
        },
        success: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true },
);

export const Transaction = model<ITransaction>('Transaction', transactionSchema);
