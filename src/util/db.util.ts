import {
    Db,
    MongoClient,
    MongoError
} from 'mongodb';
import config from './../json/config.json';

const uri = config.mongoDbUri;

let _db: Db;


export const connectToMongo = (cb: () => void) => {

    MongoClient.connect(uri, (err: MongoError, client: MongoClient) => {
        if (err) {
            console.log(err)
            throw 'Error conencting to the database';
        }

        if (client) {
            console.log('Connected to Database');
            if (!_db) {
                _db = client.db();
            }
            cb();
        }

    });
}

export const getDb = () => {
    if (_db) {
        return _db;
    }

    throw 'Not connected to db';
}