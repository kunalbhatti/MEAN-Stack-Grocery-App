import {
    Cursor,
    DeleteWriteOpResultObject,
    InsertOneWriteOpResult,
    ObjectId,
    UpdateWriteOpResult
} from 'mongodb';
import {
    getDb
} from './../util/db.util';


export interface SettingsModel {
    locations: string[];
    selectedLocation: {
        name: string,
        id: number
    };
    categories: string[];
    _id ? : string;
}

export interface ProductsModel {
    name: string;
    weight ? : string;
    size ? : string;
    price ? : string;
    brand ? : string;
    uid ? : ObjectId;
    cid ? : string;
    _id ? : ObjectId;
}

export class Settings {

    static getUserSettings(_id: ObjectId): Promise < SettingsModel > {

        const db = getDb();

        return db.collection('user_settings').findOne({
            _id
        });
    }


    static updateSelectedLocation(selectedLocation: {
        name: string,
        id: number
    }, _id: ObjectId): Promise < UpdateWriteOpResult > {

        const db = getDb();

        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                selectedLocation
            }
        });
    }

    static updateGroup(groups: string[], _id: ObjectId): Promise < UpdateWriteOpResult > {

        const db = getDb();

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

        const db = getDb();

        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                categories
            }
        })
    }

    static getProducts(uid: ObjectId, cid: string): Cursor < any > {
        const db = getDb();
        return db.collection('user_products').find({
            $and: [{
                    cid
                },
                {
                    uid
                }
            ]
        });
    }

    static getProduct(_id: ObjectId): Promise < ProductsModel > {
        const db = getDb();
        return db.collection('user_products').findOne({
            _id
        });
    }


    static addProduct(product: ProductsModel): Promise < InsertOneWriteOpResult < any >> {
        const db = getDb();
        return db.collection('user_products').insertOne(product);
    }

    static editProduct(product: ProductsModel) {
        const db = getDb();
        return db.collection('user_products').updateOne({
            _id: product._id
        }, {
            $set: {
                name: product.name,
                brand: product.brand,
                weight: product.weight,
                size: product.size,
                price: product.price
            }
        })
    }

    static deleteProduct(_id: ObjectId): Promise < DeleteWriteOpResultObject > {
        const db = getDb();
        return db.collection('user_products').deleteOne({
            _id
        });
    }
}