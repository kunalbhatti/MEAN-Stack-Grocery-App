"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Groups = void 0;
const db_util_1 = require("./../util/db.util");
class Groups {
    static addGroup(group) {
        const db = db_util_1.getDb();
        return db.collection('user_groups').insertOne(group);
    }
    static updateGroup(filter, name) {
        const db = db_util_1.getDb();
        return db.collection('user_groups').updateOne(filter, {
            $set: {
                name
            }
        });
    }
    static deleteGroup(filter) {
        const db = db_util_1.getDb();
        return db.collection('user_groups').deleteOne(filter);
    }
}
exports.Groups = Groups;
//# sourceMappingURL=groups.model.js.map