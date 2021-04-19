"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_util_1 = require("./../util/db.util");
class User {
    static register(user) {
        const db = db_util_1.getDb();
        return db.collection('users').insertOne(user);
    }
    static findUser(options) {
        const db = db_util_1.getDb();
        return db.collection('users').findOne(options);
    }
    static updateUserData(options, data) {
        const db = db_util_1.getDb();
        return db.collection('users').updateOne(options, {
            $set: data
        });
    }
}
exports.default = User;
//# sourceMappingURL=user.model.js.map