"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expenses = void 0;
const db_util_1 = require("./../util/db.util");
class Expenses {
    static addExpense(expense) {
        const db = db_util_1.getDb();
        return db.collection('user_expenses').insertOne(expense);
    }
    static updateExpense(filter, update) {
        const db = db_util_1.getDb();
        return db.collection('user_expenses').updateOne(filter, {
            $set: {
                date: update.date,
                cost: update.cost
            }
        });
    }
    static deleteExpense(eid) {
        const db = db_util_1.getDb();
        return db.collection('user_expenses').deleteOne({
            _id: eid
        });
    }
    static getExpense(filter) {
        const db = db_util_1.getDb();
        return db.collection('user_expenses').find(filter).sort({
            'date.date': 1,
            'name': 1
        });
    }
}
exports.Expenses = Expenses;
//# sourceMappingURL=expenses.model.js.map