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
        this.router.get('/filter-products', verifyToken, this.filterProducts);
        this.router.get('/get-inventory', verifyToken, this.getInventory);
        this.router.get('/get-cart', verifyToken, this.getCart);
        this.router.patch('/update-stock-count/:pid', verifyToken, this.updateStockCount);
        this.router.patch('/update-stock-status/:pid', verifyToken, this.updateStockStatus);
        this.router.patch('/update-cart-count/:pid', verifyToken, this.updateCartCount);
    }

    filterProducts(req: express.Request, res: express.Response): void {
        const uid: ObjectId = new ObjectId(req.body._id);

        let searchStr: string = req.query.searchStr.toString();
        // removing special characters from the string
        searchStr = searchStr.replace(/[^a-zA-Z]/g, "");

        const gid: string = req.query.gid.toString();
        const cid: string = req.query.cid.toString();

        const categoryFilter = {
            $and: [{
                uid
            }, {
                cid
            }, {
                name: {
                    $regex: `^.*${searchStr}.*$`,
                    $options: 'i'
                }
            }]
        }

        const normalFilter = {
            $and: [{
                uid
            }, {
                name: {
                    $regex: `^.*${searchStr}.*$`,
                    $options: 'i'
                }
            }]
        }

        Products.filterProducts(cid ? categoryFilter : normalFilter).toArray().then(
            (products: ProductsModel[]) => {

                products.map((product: ProductsModel) => {
                    if (product.stockCount) {
                        if (!product.stockCount[gid]) {
                            product.stockCount = {
                                [gid]: 0
                            };
                        }
                    }
                    // newly added products will not have stockCount field
                    if (!product.stockCount) {
                        product.stockCount = {
                            [gid]: 0
                        };
                    }

                    if (product.cart) {
                        if (!product.cart[gid]) {
                            product.cart = {
                                [gid]: 0
                            };
                        }
                    }
                    // newly added products will not have cart field
                    if (!product.cart) {
                        product.cart = {
                            [gid]: 0
                        };
                    }

                    if (product.stockStatus) {
                        if (!product.stockStatus[gid]) {

                            product.stockStatus = {
                                [gid]: ''
                            };
                        }
                    }
                    // newly added products will not have stockStatus field
                    if (!product.stockStatus) {
                        product.stockStatus = {
                            [gid]: ''
                        };
                    }
                })
                res.status(200).send(products)
            }
        ).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send(responseCode[500]);
        });
    }

    getInventory(req: express.Request, res: express.Response): void {
        const uid: ObjectId = new ObjectId(req.body._id);
        const gid: string = req.query.gid.toString();
        const cid: string = req.query.cid.toString();
        const getProductView: string = req.query.getProductsView.toString();

        let productViewFilter: any = {};

        if (getProductView === 'partial') {
            productViewFilter = {
                $and: [{
                    [`stockCount.${gid}`]: {
                        $gt: 0
                    },
                }, {
                    [`stockStatus.${gid}`]: {
                        $ne: 'empty'
                    }
                }]
            }
        }

        const categoryFilter = {
            $and: [{
                uid
            }, productViewFilter, {
                cid
            }, ]
        }

        const normalFilter = {
            $and: [{
                uid
            }, productViewFilter]
        }

        Products.getInventory(cid ? categoryFilter : normalFilter).toArray().then((products: ProductsModel[]) => {
            products.map((product: ProductsModel) => {
                if (product.stockCount) {
                    if (!product.stockCount[gid]) {

                        product.stockCount = {
                            [gid]: 0
                        };
                    }
                }
                if (!product.stockCount) {
                    product.stockCount = {
                        [gid]: 0
                    };
                }

                if (product.stockStatus) {
                    if (!product.stockStatus[gid]) {

                        product.stockStatus = {
                            [gid]: ''
                        };
                    }
                }

                if (!product.stockStatus) {
                    product.stockStatus = {
                        [gid]: ''
                    };
                }
            })
            res.status(200).send(products);
        }).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send(responseCode[500]);
        });
    }

    getCart(req: express.Request, res: express.Response): void {
        const uid: ObjectId = new ObjectId(req.body._id);
        const gid: string = req.query.gid.toString();
        const cid: string = req.query.cid.toString();

        const normalFilter = {
            $and: [{
                uid
            }, {
                [`cart.${gid}`]: {
                    $gt: 0
                }
            }]
        }

        const categoryFilter = {
            $and: [{
                uid
            }, {
                cid
            }, {
                [`cart.${gid}`]: {
                    $gt: 0
                }
            }]
        }

        Products.getInventory(cid ? categoryFilter : normalFilter).toArray().then(
            (products: ProductsModel[]) => {
                products.map((product: ProductsModel) => {
                    if (product.stockCount) {
                        if (!product.stockCount[gid]) {

                            product.stockCount = {
                                [gid]: 0
                            };
                        }
                    }
                    if (!product.stockCount) {
                        product.stockCount = {
                            [gid]: 0
                        };
                    }

                    if (product.stockStatus) {
                        if (!product.stockStatus[gid]) {

                            product.stockStatus = {
                                [gid]: ''
                            };
                        }
                    }

                    if (!product.stockStatus) {
                        product.stockStatus = {
                            [gid]: ''
                        };
                    }
                })
                res.status(200).send(products);
            }
        ).catch((error: MongoError) => {
            console.log(error)
            res.status(500).send({
                message: responseCode[500]
            });
        });

    }

    updateStockCount(req: express.Request, res: express.Response): void {
        const pid: ObjectId = new ObjectId(req.params.pid);
        const count: number = +req.body.count;
        const gid: string = req.body.gid;

        const filter = {
            _id: pid
        }

        Products.updateStockCount(filter, count, gid).then(() => {
            res.status(200).send({
                updated: true
            });
        }).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send(responseCode[500]);
        });
    }

    updateStockStatus(req: express.Request, res: express.Response): void {
        const pid: ObjectId = new ObjectId(req.params.pid);
        const status: string = req.body.status;
        const gid: string = req.body.gid;

        const filter = {
            _id: pid
        }

        Products.updateStockStatus(filter, status, gid).then(() => {
            res.status(200).send({
                updated: true
            });
        }).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send(responseCode[500]);
        });
    }

    updateCartCount(req: express.Request, res: express.Response): void {
        const pid: ObjectId = new ObjectId(req.params.pid);
        const count: number = +req.body.count;
        const gid: string = req.body.gid;

        const filter = {
            _id: pid
        }

        Products.updateCartCount(filter, count, gid).then(() => {
            res.status(200).send({
                updated: true
            });
        }).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send(responseCode[500]);
        });
    }

}