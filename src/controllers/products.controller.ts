import express from 'express';
import {
    Products,
    ProductsModel
} from './../models/products.model';

import verifyToken from './../middlewares/validate-token.middleware';
import {
    MongoError,
    ObjectId
} from 'mongodb';

import responseCode from './../json/response-code.json';

export default class ProductsController {
    private _router = express.Router();

    get router(): express.Router {
        return this._router;
    }

    constructor() {
        this.router.get('/filter-products/:searchStr?', verifyToken, this.filterProducts);
        this.router.get('/inventory-by-products', verifyToken, this.getInventoryByProducts);
        this.router.get('/inventory-by-category/:cid', verifyToken, this.getInventoryByCategory);
        this.router.patch('/update-stock-count/:pid', verifyToken, this.updateStockCount);
        this.router.patch('/update-stock-status/:pid', verifyToken, this.updateStockStatus);
    }

    filterProducts(req: express.Request, res: express.Response) {
        const uid: ObjectId = new ObjectId(req.body._id);
        const searchStr: string = req.params.searchStr;

        Products.filterProducts(uid, searchStr).toArray().then(
            products => {
                res.status(200).send(products)
            }
        );
    }

    getInventoryByProducts(req: express.Request, res: express.Response) {
        const uid = new ObjectId(req.body._id);
        const query = {
            $and: [{
                uid
            }, {
                $or: [{
                        stockCount: {
                            $gt: 0
                        },
                    }, {
                        stockStatus: {
                            $ne: 'empty'
                        }
                    }
                ]

            }]
        }
        Products.getInventory(query).toArray().then((products: ProductsModel[]) => {
            res.status(200).send(products);
        }).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send(responseCode[500]);
        });
    }

    getInventoryByCategory(req: express.Request, res: express.Response) {
        const uid: ObjectId = new ObjectId(req.body._id);
        const cid: string = req.params.cid;

        const query = {
            $and: [{
                uid
            }, {
                cid
            }, {
                stockCount: {
                    $gt: 0
                }
            }]
        }

        Products.getInventory(query).toArray().then((products: ProductsModel[]) => {
            res.status(200).send(products);
        }).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send(responseCode[500]);
        });
    }

    updateStockCount(req: express.Request, res: express.Response) {
        const _id: ObjectId = new ObjectId(req.params.pid);
        const count: number = +req.body.count;
        const gid: string = req.body.gid;

        const query = {
            _id
        }

        Products.updateStockCount(query, count, gid).then(() => {
            res.status(200).send({
                updated: true
            });
        })
    }

    updateStockStatus(req: express.Request, res: express.Response) {
        const _id: ObjectId = new ObjectId(req.params.pid);
        const status: string = req.body.status;
        const gid: string = req.body.gid;

        const query = {
            _id
        }

        Products.updateStockStatus(query, status, gid).then(() => {
            res.status(200).send({
                updated: true
            });
        })
    }
}