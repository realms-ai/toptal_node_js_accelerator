import mongoose from 'mongoose';
import { Constants } from './constants.js';
const { MONGODB_URL, mongodb_name } = Constants;
const mongooseConnect = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(`${MONGODB_URL}/${mongodb_name}`);
};
export { mongooseConnect, mongoConnect, getDb };
import { MongoClient } from 'mongodb';
let _db;
console.log('MongoDB URL: ', MONGODB_URL);
const client = new MongoClient(MONGODB_URL, {
// serverApi: ServerApiVersion.v1,
});
const mongoConnect = async () => {
    await client.connect();
    _db = await client.db(mongodb_name);
};
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
};
