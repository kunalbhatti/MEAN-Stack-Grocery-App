import {
    ObjectId,
    Cursor,
    Db,
    InsertOneWriteOpResult,
    DeleteWriteOpResultObject,
    UpdateWriteOpResult
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
    stockCount ? : {
        [gid: string]: number;
    };
    stockStatus ? : {
        [gid: string]: string;
    };
    cartCount ? : {
        [gid: string]: number;
    }
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

    static filterProducts(filter: any) {
        const db: Db = getDb();


        return db.collection('user_products').find(filter, {
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

    static updateStockCount(filter: any, count: number, gid: string): Promise < UpdateWriteOpResult > {
        const db: Db = getDb();
        return db.collection('user_products').updateOne(
            filter, {
                $inc: {
                    [`stockCount.${gid}`]: count
                }
            });
    }

    static updateStockStatus(filter: any, status: string, gid: string): Promise < UpdateWriteOpResult > {
        const db: Db = getDb();
        return db.collection('user_products').updateOne(
            filter, {
                $set: {
                    [`stockStatus.${gid}`]: status
                }
            }
        );
    }

    static updateCartCount(filter: any, count: number, gid: string): Promise < UpdateWriteOpResult > {
        const db: Db = getDb();

        return db.collection('user_products').updateOne(
            filter, {
                $set: {
                    [`cart.${gid}`]: count
                }
            }
        );
    }
}