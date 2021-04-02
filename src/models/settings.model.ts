import {
    Db,
    ObjectId,
    UpdateWriteOpResult
} from 'mongodb';
import {
    getDb
} from './../util/db.util';


export interface SettingsModel {
    currentGroup: string;
    groups: {
        [id: string]: string
    };
    selectedLocation: {
        name: string,
        id: number
    };
    categories: {
        [id: string]: string
    };
    expenses: {
        [id: string]: string
    } [];
    _id ? : string;
}

export class Settings {

    static getUserSettings(_id: ObjectId): Promise < SettingsModel > {

        const db: Db = getDb();

        return db.collection('user_settings').findOne({
            _id
        });
    }

    static updateCurrentGroup(_id: ObjectId, gid: string) {
        const db: Db = getDb();

        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                currentGroup: gid
            }
        })
    }


    static updateSelectedLocation(selectedLocation: {
        name: string,
        id: number
    }, _id: ObjectId): Promise < UpdateWriteOpResult > {

        const db: Db = getDb();

        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                selectedLocation
            }
        });
    }

    static updateGroup(groups: string[], _id: ObjectId): Promise < UpdateWriteOpResult > {

        const db: Db = getDb();

        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                groups
            },
        }, {
            upsert: true
        })
    }

    static updateCategories(categories: string[], _id: ObjectId): Promise < UpdateWriteOpResult > {
        const db: Db = getDb();

        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                categories
            }
        }, {
            upsert: true
        });
    }

    static updateExpenses(expenses: string[], _id: ObjectId): Promise < UpdateWriteOpResult > {

        const db: Db = getDb();

        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                expenses
            },
        }, {
            upsert: true
        })
    }
}