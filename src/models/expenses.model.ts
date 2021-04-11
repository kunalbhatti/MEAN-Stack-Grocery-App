import {
    ObjectId
} from 'bson';
import {
    Cursor,
    Db,
    DeleteWriteOpResultObject,
    InsertOneWriteOpResult
} from 'mongodb';
import {
    getDb
} from './../util/db.util';

export interface ExpenseModel {
    uid: ObjectId;
    pid ? : ObjectId | string;
    cid ? : string;
    gid: string;
    name: string;
    brand ? : string;
    units: number;
    cost: number;
    date: {
        year: number,
        month: number,
        date: number
    };
}

export class Expenses {

    static addExpense(expense: ExpenseModel): Promise < InsertOneWriteOpResult < any > > {
        const db: Db = getDb();

        return db.collection('user_expenses').insertOne(expense);
    }

    static updateExpense(filter: {
        _id: ObjectId
    }, update: {
        date: ExpenseModel['date'],
        cost: ExpenseModel['cost']
    }) {
        const db: Db = getDb();

        return db.collection('user_expenses').updateOne(filter, {
            $set: {
                date: update.date,
                cost: update.cost
            }
        });
    }


    static deleteExpense(eid: ObjectId): Promise < DeleteWriteOpResultObject > {
        const db: Db = getDb();

        return db.collection('user_expenses').deleteOne({
            _id: eid
        });
    }

    static getExpense(filter: any): Cursor < any > {
        const db: Db = getDb();

        return db.collection('user_expenses').find(filter).sort({
            'date.date': 1,
            'name': 1
        });
    }
}