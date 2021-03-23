import {
    Db,
    InsertOneWriteOpResult,
    ObjectId,
    UpdateWriteOpResult,
} from 'mongodb';
import {
    getDb
} from './../util/db.util';


export interface UserModel {
    email: string;
    name: string;
    password: string;
    _id ? : string;
}

export default class User {
    static register(user: UserModel): Promise < InsertOneWriteOpResult < any > > {
        const db: Db = getDb();

        return db.collection('users').insertOne(user);
    }

    static findUser(options: any): Promise < UserModel > {
        const db: Db = getDb();

        return db.collection('users').findOne(options);
    }

    static updateUserData(options: {
        _id: ObjectId
    }, data: any): Promise < UpdateWriteOpResult > {
        const db: Db = getDb();

        return db.collection('users').updateOne(options, {
            $set: data
        });
    }

}