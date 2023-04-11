import mongoose from 'mongoose';

const db = {
    connect: () => {
        mongoose.Promise = global.Promise;
        return mongoose.connect(process.env.MONGODB_URL!);
    },
    disconnect: () => {
        return mongoose.disconnect();
    },
    isDisconnected: () => {
        const state = mongoose.connection.readyState;
        return state == 0 || state == 3 || state == 99;
    },
};

export default db;
