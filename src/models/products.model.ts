import {
    ObjectId,
    Cursor,
    Db,
    InsertOneWriteOpResult,
    DeleteWriteOpResultObject
} from 'mongodb';
import {
    getDb
} from './../util/db.util';

export interface ProductsModel {
    name: string;
    price: string;
    quantity ? : string;
    size ? : string;
    brand ? : string;
    stockCount ? : string;
    stockStatus ? : string;
    uid ? : ObjectId; // user id
    cid ? : string; // category id
    _id ? : ObjectId; //
}

export class Products {
    static getProducts(uid: ObjectId, cid ? : string): Cursor < any > {
        const db: Db = getDb();

        const andQuery = {
            $and: [{
                    cid
                },
                {
                    uid
                }
            ]
        };

        const query = {
            uid
        };

        return db.collection('user_products').find(cid ? andQuery : query);
    }

    static filterProducts(uid: ObjectId, searchStr: string) {
        const db: Db = getDb();

        return db.collection('user_products').find({
            $and: [{
                uid
            }, {

                name: {
                    $regex: `^.*${searchStr}.*$`,
                    $options: 'i'
                }
            }]

        }, {
            projection: {
                uid: 0
            }
        });
    }

    static addProduct(product: ProductsModel): Promise < InsertOneWriteOpResult < any >> {
        const db: Db = getDb();
        return db.collection('user_products').insertOne(product);
    }

    static editProduct(product: ProductsModel) {
        const db: Db = getDb();
        return db.collection('user_products').updateOne({
            _id: product._id
        }, {
            $set: {
                name: product.name,
                brand: product.brand,
                size: product.size,
                quantity: product.quantity,
                stockCount: product.stockCount,
                stockStatus: product.stockStatus,
                price: product.price
            }
        });
    }

    static deleteProduct(_id: ObjectId): Promise < DeleteWriteOpResultObject > {
        const db: Db = getDb();
        return db.collection('user_products').deleteOne({
            _id
        });
    }

    static deleteProducts(cid: string): Promise < DeleteWriteOpResultObject > {
        const db: Db = getDb();
        return db.collection('user_products').deleteMany({
            cid
        });
    }

    static getInventory(filter: any): Cursor < any > {
        const db: Db = getDb();
        return db.collection('user_products').find(filter);
    }

    static updateStockCount(filter: any, count: string) {
        const db: Db = getDb();

        return db.collection('user_products').updateOne(
            filter, {
                $set: {
                    stockCount: count
                }
            });
    }

    static updateStockStatus(filter: any, status: string) {
        const db: Db = getDb();

        return db.collection('user_products').updateOne(
            filter, {
                $set: {
                    stockStatus: status
                }
            });
    }
}