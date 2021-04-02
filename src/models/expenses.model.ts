import {
    ObjectId
} from 'bson';
import {
    Db,
    InsertOneWriteOpResult
} from 'mongodb';
import {
    getDb
} from './../util/db.util';

export interface ExpensesModel {
    uid : ObjectId;
    pid ? : ObjectId;
    cid ? : string;
    gid: string;
    name: string;
    units: number;
    cost: number;
    date: {
        year: number, 
        month: number,
        date: number
    };
}

export class Expenses {
    constructor() {

    }

    static addExpense(expense: ExpensesModel): Promise < InsertOneWriteOpResult < any > > {
        const db: Db = getDb();

        return db.collection('user_expenses').insertOne(expense);
    }

    static editExpense(filter: {
        _id: ObjectId
    }, expense: any) {
        const db: Db = getDb();

        return db.collection('user_expenses').updateOne(filter, expense);
    }

    static getExpense(filter: any) {
        const db: Db = getDb();

        return db.collection('user_expenses').find(filter).sort({'date.date': 1});
    }
}