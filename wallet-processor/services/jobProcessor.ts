import { Job } from 'bullmq';
import { Customer } from '../schemas/customer';
import { Transaction } from '../schemas/transaction';

export interface Transaction {
    value: number;
    latency: number;
    customer_id: string;
}

export class JobProcessor {
    private job: Job;

    constructor(job: Job) {
        this.job = job;
    }

    public async processJob() {
        console.log(`Processing chunk id: ${this.job.name}`);
        const transactions = this.job.data as Transaction[];
        const customerIds = transactions.map((t) => t.customer_id);
        const ccInfo = await this.getCustomerCreditCardInfo(customerIds);
        const ccObj = this.arrayToObject(ccInfo);
        transactions.forEach(async (tr) => {
            const newTransaction = new Transaction({
                value: tr.value,
                latency: tr.latency,
                customer_id: tr.customer_id,
                success: true,
            });
            if (tr.value > ccObj[tr.customer_id].credit_card.ballance) {
                newTransaction.success = false;
            } else {
                await Customer.findByIdAndUpdate(tr.customer_id, {
                    $set: { 'credit_card.ballance': ccObj[tr.customer_id].credit_card.ballance - tr.value },
                });
            }
            await newTransaction.save();
        });
    }

    private getCustomerCreditCardInfo(ids: string[]) {
        return Customer.find({ _id: { $in: ids } }).select('credit_card');
    }

    private arrayToObject(arr: any[]) {
        const obj: { [key: string]: any } = {};
        arr.forEach((e) => {
            obj[e._id.toString() as string] = e;
        });
        return obj;
    }
}
