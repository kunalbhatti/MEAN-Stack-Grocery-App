"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const db_util_1 = require("./../util/db.util");
class Products {
    static getProducts(uid, cid) {
        const db = db_util_1.getDb();
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
        return db.collection('user_products').find(cid ? andQuery : query).sort({
            'name': 1
        });
    }
    static filterProducts(filter) {
        const db = db_util_1.getDb();
        return db.collection('user_products').find(filter, {
            projection: {
                uid: 0
            }
        }).sort({
            'name': 1
        });
    }
    static addProduct(product) {
        const db = db_util_1.getDb();
        return db.collection('user_products').insertOne(product);
    }
    static editProduct(product) {
        const db = db_util_1.getDb();
        return db.collection('user_products').updateOne({
            _id: product._id
        }, {
            $set: {
                name: product.name,
                brand: product.brand,
                size: product.size,
                quantity: product.quantity,
                unit: product.unit,
                price: product.price
            }
        });
    }
    static deleteProduct(_id) {
        const db = db_util_1.getDb();
        return db.collection('user_products').deleteOne({
            _id
        });
    }
    static deleteProducts(cid) {
        const db = db_util_1.getDb();
        return db.collection('user_products').deleteMany({
            cid
        });
    }
    static getInventory(filter) {
        const db = db_util_1.getDb();
        return db.collection('user_products').find(filter).sort({
            'name': 1
        });
    }
    static updateStockCount(filter, count, gid) {
        const db = db_util_1.getDb();
        return db.collection('user_products').updateOne(filter, {
            $inc: {
                [`stockCount.${gid}`]: count
            }
        });
    }
    static updateStockStatus(filter, status, gid) {
        const db = db_util_1.getDb();
        return db.collection('user_products').updateOne(filter, {
            $set: {
                [`stockStatus.${gid}`]: status
            }
        });
    }
    static updateCartCount(filter, count, gid) {
        const db = db_util_1.getDb();
        return db.collection('user_products').updateOne(filter, {
            $inc: {
                [`cart.${gid}`]: count
            }
        });
    }
}
exports.Products = Products;
//# sourceMappingURL=products.model.js.map