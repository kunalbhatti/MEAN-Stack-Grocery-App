import * as express from 'express';
import {
    InsertOneWriteOpResult,
    MongoError,
    ObjectId
} from 'mongodb';

import {
    Expenses,
    ExpenseModel
} from './../models/expenses.model';

import verifyToken from './../middlewares/validate-token.middleware';
import responseCode from './../json/response-code.json';


export default class ExpensesController {
    private _router: express.Router = express.Router();

    get router(): express.Router {
        return this._router;
    }

    constructor() {
        this.router.get('/get-expense', verifyToken, this.getExpense);
        this.router.get('/get-product-expense', verifyToken, this.getProductExpense);
        this.router.post('/add-expense', verifyToken, this.addExpense);
        this.router.patch('/update-expense', verifyToken, this.updateExpense);
        this.router.delete('/delete-expense/:eid', verifyToken, this.deleteExpense);
    }

    getExpense(req: express.Request, res: express.Response): void {

        const month: number = +req.query.month.toString();
        const year: number = +req.query.year.toString();
        const gid: string = req.query.gid.toString();
        const cid: string = req.query.cid.toString();
        const view: string = req.query.view.toString();

        let monthlyFilter = {};
        if (view === 'monthly') {
            monthlyFilter = {
                'date.month': month
            };
        }

        const categoryFilter = {
            $and: [{
                    gid
                }, {
                    cid
                }, {
                    'date.year': year
                },
                monthlyFilter
            ]
        }

        const normalFilter = {
            $and: [{
                    gid
                }, {
                    'date.year': year
                },
                monthlyFilter
            ]
        }

        Expenses.getExpense(cid ? categoryFilter : normalFilter).toArray().then(
            (expenses: ExpenseModel[]) => {
                res.status(200).send(expenses);
            }
        ).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        });
    }

    getProductExpense(req: express.Request, res: express.Response): void {
        const gid: string = req.query.gid.toString();
        const cid: string = req.query.cid.toString();

        let searchStr: string = req.query.searchStr.toString();
        // removing special characters from the string
        searchStr = searchStr.replace(/[^a-zA-Z]/g, "");

        const date: ExpenseModel['date'] = JSON.parse(req.query.date.toString());
        const view: string = req.query.view.toString();

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
        }

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
        }

        Expenses.getExpense(cid ? categoryFilter : normalFilter).toArray().then(
            (expenses: ExpenseModel[]) => {
                console.log(expenses)
                res.status(200).send({
                    expenses
                });
            }
        ).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        })
    }

    addExpense(req: express.Request, res: express.Response): void {

        const uid: ObjectId = new ObjectId(req.body._id);
        const cid: string = req.body.cid;
        const gid: string = req.body.gid;
        const name: string = req.body.name;
        const brand: string = req.body.brand;
        const cost: number = +req.body.cost;
        const units: number = +req.body.units;
        const date: ExpenseModel['date'] = req.body.date;

        // pid will be string in case of other expenses
        let pid: ObjectId | string;

        try {
            pid = new ObjectId(req.body.pid);
        } catch (error) {
            pid = req.body.pid;
        }

        const expense: ExpenseModel = {
            uid,
            pid,
            cid,
            gid,
            cost,
            units,
            name,
            brand,
            date
        }

        Expenses.addExpense(expense).then(
            (newExpense: InsertOneWriteOpResult < any > ) => {
                expense['_id'] = newExpense.insertedId
                res.status(200).send({
                    expense
                });
            }, (error: MongoError) => {
                console.log(error);
                res.status(500).send({
                    message: responseCode[500]
                });
            }
        )
    }


    updateExpense(req: express.Request, res: express.Response): void {

        const eid: ObjectId = new ObjectId(req.body.eid);
        const update: {
            date: ExpenseModel['date'],
            cost: ExpenseModel['cost']
        } = req.body.update;

        Expenses.updateExpense({
            _id: eid
        }, update).then(
            () => {
                res.status(200).send({
                    message: 'updated'
                })
            }
        ), (error: MongoError) => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        }

    }

    deleteExpense(req: express.Request, res: express.Response): void {
        const eid: ObjectId = new ObjectId(req.params.eid);

        Expenses.deleteExpense(eid).then(
            () => {
                res.status(200).send({
                    message: 'Expense deleted successfully'
                });
            }
        ).catch(
            (error: MongoError) => {
                console.log(error);
                res.status(500).send({
                    message: responseCode[500]
                });
            });
    }
}