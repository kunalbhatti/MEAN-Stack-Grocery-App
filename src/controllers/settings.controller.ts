import express from 'express';
import {
    InsertOneWriteOpResult,
    MongoError
} from 'mongodb';

import {
    ObjectId
} from 'mongodb';

import verifyToken from './../middlewares/validate-token.middleware';

import {
    Settings,
    SettingsModel,
    ProductsModel
} from './../models/settings.model';

import responseCode from './../json/response-code.json'

export default class SettingsController {

    private _router: express.Router = express.Router();

    get router(): express.Router {
        return this._router;
    }

    constructor() {
        this.router.get('/get-settings', verifyToken, this.getSettings);
        this.router.patch('/update-group', verifyToken, this.updateGroup);
        this.router.patch('/update-category', verifyToken, this.updateCategory);
        this.router.get('/get-products/:cid', verifyToken, this.getProducts);
        this.router.get('/get-product', verifyToken, this.getProduct);
        this.router.post('/add-product', verifyToken, this.addProduct);
        this.router.patch('/edit-product', verifyToken, this.editProduct);
        this.router.delete('/delete-product/:productId', verifyToken, this.deleteProduct);
    }

    getSettings(req: express.Request, res: express.Response): void {
        Settings.getUserSettings(new ObjectId(req.body._id)).then(
            (settings: SettingsModel) => {
                if (settings) {
                    delete settings._id;
                }

                res.status(200).send({
                    settings
                });
            }
        ).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        });
    }

    updateGroup(req: express.Request, res: express.Response): void {
        const _id: ObjectId = new ObjectId(req.body._id);
        const groups: string[] = req.body.groups;

        Settings.updateGroup(groups, _id).then(
            (result) => {
                res.status(200).send({
                    groups
                });
            }
        ).catch(
            error => {
                console.log(error)
                res.status(500).send({
                    message: responseCode[500]
                });
            }
        )
    }

    updateCategory(req: express.Request, res: express.Response): void {
        const _id: ObjectId = new ObjectId(req.body._id);
        const categories: string[] = req.body.categories;

        Settings.updateCategories(categories, _id).then(
            (result) => {
                res.status(200).send({
                    categories
                });
            }
        ).catch(
            error => {
                console.log(error)
                res.status(500).send({
                    message: responseCode[500]
                });
            }
        )
    }

    getProducts(req: express.Request, res: express.Response) {
        const uid = new ObjectId(req.body._id);
        const cid = req.params.cid;
        Settings.getProducts(uid, cid).toArray().then(
            products => {
                res.status(200).send(products);
            }
        ).catch(error => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        })
    }

    addProduct(req: express.Request, res: express.Response) {
        const product: ProductsModel = req.body.product;
        product.uid = new ObjectId(req.body._id);

        Settings.addProduct(product).then(
            (result: InsertOneWriteOpResult < any > ) => {
                product._id = result.insertedId;
                delete product.uid;
                res.status(200).send({
                    product
                });
            }
        ).catch(
            (error: MongoError) => {
                console.log(error);
                res.status(500).send(responseCode[500]);
            }
        );
    }

    editProduct(req: express.Request, res: express.Response) {
        const product: ProductsModel = req.body.product;
        product._id = new ObjectId(product._id);
        Settings.editProduct(product).then(
            result => {
                res.status(200).send({
                    product
                });
            }
        ).catch(error => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        })
    }

    getProduct(req: express.Request, res: express.Response) {
        const _id = new ObjectId(req.body.productId);
        Settings.getProduct(_id).then(
            result => {
                res.status(200).send({
                    result
                });
            }
        ).catch(error => {
            res.status(500).send({
                message: responseCode[500]
            });
        })
    }

    deleteProduct(req: express.Request, res: express.Response) {
        const _id = new ObjectId(req.params.productId);

        Settings.deleteProduct(_id).then(
            result => {
                res.status(200).send({
                    message: 'Product Deleted'
                });
            }
        ).catch(error => {
            res.status(500).send({
                message: responseCode[500]
            });
        })
    }
}