import * as express from 'express';

import {
    Expenses,
    ExpensesModel
} from './../models/expenses.model';

import verifyToken from './../middlewares/validate-token.middleware';
import responseCode from './../json/response-code.json';
import {
    InsertOneWriteOpResult,
    MongoError,
    ObjectId
} from 'mongodb';

export class ExpensesController {
    private _router: express.Router = express.Router();

    get router(): express.Router {
        return this._router;
    }

    constructor() {
        this.router.post('/add-expense', verifyToken, this.addExpense);
        this.router.get('/get-expense', verifyToken, this.getExpense);
    }

    addExpense(req: express.Request, res: express.Response) {

        const uid: ObjectId = new ObjectId(req.body._id);
        const pid: ObjectId = new ObjectId(req.body.pid);
        const cid: string = req.body.cid;
        const gid: string = req.body.gid;
        const name: string = req.body.name;
        const cost: number = +req.body.cost;
        const units: number = +req.body.units;

        const date: {
            year: number,
            month: number,
            date: number
        } = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate()
        }

        const expense: ExpensesModel = {
            uid,
            pid,
            cid,
            gid,
            cost,
            units,
            name,
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

    getExpense(req: express.Request, res: express.Response) {

        const month: number = +req.query.month.toString();
        const year: number = +req.query.year.toString();
        const gid: string = req.query.gid.toString();

        const query = {
            $and: [{
                gid
            }, {

                ['date.year']: year
            },
            {
                ['date.month']: month
            }]
        }

        Expenses.getExpense(query).toArray().then(
            (expenses: ExpensesModel[]) => {
                res.status(200).send(expenses);
            }
        );
    }
}