"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const mongodb_1 = require("mongodb");
const expenses_model_1 = require("./../models/expenses.model");
const validate_token_middleware_1 = __importDefault(require("./../middlewares/validate-token.middleware"));
const response_code_json_1 = __importDefault(require("./../json/response-code.json"));
class ExpensesController {
    constructor() {
        this._router = express.Router();
        this.router.get('/get-expense', validate_token_middleware_1.default, this.getExpense);
        this.router.get('/get-product-expense', validate_token_middleware_1.default, this.getProductExpense);
        this.router.post('/add-expense', validate_token_middleware_1.default, this.addExpense);
        this.router.patch('/update-expense', validate_token_middleware_1.default, this.updateExpense);
        this.router.delete('/delete-expense/:eid', validate_token_middleware_1.default, this.deleteExpense);
    }
    get router() {
        return this._router;
    }
    getExpense(req, res) {
        const month = +req.query.month.toString();
        const year = +req.query.year.toString();
        const gid = req.query.gid.toString();
        const view = req.query.view.toString();
        let monthlyFilter = {};
        if (view === 'monthly') {
            monthlyFilter = {
                'date.month': month
            };
        }
        const normalFilter = {
            $and: [{
                    gid
                }, {
                    'date.year': year
                },
                monthlyFilter
            ]
        };
        expenses_model_1.Expenses.getExpense(normalFilter).toArray().then((expenses) => {
            res.status(200).send(expenses);
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    // filters expenses on the server
    // not in use
    getProductExpense(req, res) {
        const gid = req.query.gid.toString();
        const cid = req.query.cid.toString();
        let searchStr = req.query.searchStr.toString();
        // removing special characters from the string
        searchStr = searchStr.replace(/[^a-zA-Z]/g, "");
        const date = JSON.parse(req.query.date.toString());
        const view = req.query.view.toString();
        let monthlyFilter = {};
        if (view === 'monthly') {
            monthlyFilter = {
                'date.month': date.month
            };
        }
        const categoryFilter = {
            $and: [{
                    gid
                }, {
                    cid
                }, monthlyFilter, {
                    'date.year': date.year
                }, {
                    name: {
                        $regex: `^.*${searchStr}.*$`,
                        $options: 'i'
                    }
                }]
        };
        const normalFilter = {
            $and: [{
                    gid
                }, monthlyFilter, {
                    'date.year': date.year,
                }, {
                    name: {
                        $regex: `^.*${searchStr}.*$`,
                        $options: 'i'
                    }
                }]
        };
        expenses_model_1.Expenses.getExpense(cid ? categoryFilter : normalFilter).toArray().then((expenses) => {
            console.log(expenses);
            res.status(200).send({
                expenses
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    addExpense(req, res) {
        const uid = new mongodb_1.ObjectId(req.body._id);
        const cid = req.body.cid;
        const gid = req.body.gid;
        const name = req.body.name;
        const brand = req.body.brand;
        const cost = +req.body.cost;
        const units = +req.body.units;
        const date = req.body.date;
        // pid will be string in case of other expenses
        let pid;
        try {
            pid = new mongodb_1.ObjectId(req.body.pid);
        }
        catch (error) {
            pid = req.body.pid;
        }
        const expense = {
            uid,
            pid,
            cid,
            gid,
            cost,
            units,
            name,
            brand,
            date
        };
        expenses_model_1.Expenses.addExpense(expense).then((newExpense) => {
            expense['_id'] = newExpense.insertedId;
            res.status(200).send({
                expense
            });
        }, (error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    updateExpense(req, res) {
        const eid = new mongodb_1.ObjectId(req.body.eid);
        const update = req.body.update;
        expenses_model_1.Expenses.updateExpense({
            _id: eid
        }, update).then(() => {
            res.status(200).send({
                message: 'updated'
            });
        }), (error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        };
    }
    deleteExpense(req, res) {
        const eid = new mongodb_1.ObjectId(req.params.eid);
        expenses_model_1.Expenses.deleteExpense(eid).then(() => {
            res.status(200).send({
                message: 'Expense deleted successfully'
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
}
exports.default = ExpensesController;
//# sourceMappingURL=expenses.controller.js.map