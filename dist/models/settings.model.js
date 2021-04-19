"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const db_util_1 = require("./../util/db.util");
class Settings {
    static getUserSettings(_id) {
        const db = db_util_1.getDb();
        return db.collection('user_settings').findOne({
            _id
        });
    }
    static updateCurrentGroup(_id, gid) {
        const db = db_util_1.getDb();
        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                currentGroup: gid
            }
        });
    }
    static updateSelectedLocation(selectedLocation, _id) {
        const db = db_util_1.getDb();
        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                selectedLocation
            }
        });
    }
    static updateGroup(groups, _id) {
        const db = db_util_1.getDb();
        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                groups
            },
        }, {
            upsert: true
        });
    }
    static updateCategories(categories, _id) {
        const db = db_util_1.getDb();
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
    static updateExpenses(expenses, _id) {
        const db = db_util_1.getDb();
        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                expenses
            },
        }, {
            upsert: true
        });
    }
    static updateGetProductsView(getProductsView, _id) {
        const db = db_util_1.getDb();
        return db.collection('user_settings').updateOne({
            _id
        }, {
            $set: {
                getProductsView
            }
        }, {
            upsert: true
        });
    }
}
exports.Settings = Settings;
//# sourceMappingURL=settings.model.js.map