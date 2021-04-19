"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const validate_token_middleware_1 = __importDefault(require("./../middlewares/validate-token.middleware"));
const settings_model_1 = require("./../models/settings.model");
const products_model_1 = require("./../models/products.model");
const response_code_json_1 = __importDefault(require("./../json/response-code.json"));
class SettingsController {
    constructor() {
        this._router = express_1.default.Router();
        this.router.get('/get-settings', validate_token_middleware_1.default, this.getSettings);
        this.router.patch('/update-get-products-view', validate_token_middleware_1.default, this.updateGetProductsView);
        this.router.patch('/update-current-group', validate_token_middleware_1.default, this.updateCurrentGroup);
        this.router.patch('/update-group', validate_token_middleware_1.default, this.updateGroup);
        this.router.patch('/update-category', validate_token_middleware_1.default, this.updateCategory);
        this.router.patch('/update-expense', validate_token_middleware_1.default, this.updateExpense);
        this.router.get('/get-products/:cid?', validate_token_middleware_1.default, this.getProducts);
        this.router.post('/add-product', validate_token_middleware_1.default, this.addProduct);
        this.router.patch('/edit-product', validate_token_middleware_1.default, this.editProduct);
        this.router.delete('/delete-product/:productId', validate_token_middleware_1.default, this.deleteProduct);
    }
    get router() {
        return this._router;
    }
    getSettings(req, res) {
        settings_model_1.Settings.getUserSettings(new mongodb_1.ObjectId(req.body._id)).then((settings) => {
            if (settings) {
                delete settings._id;
            }
            res.status(200).send({
                settings
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    updateCurrentGroup(req, res) {
        const _id = new mongodb_1.ObjectId(req.body._id);
        const gid = req.body.gid;
        settings_model_1.Settings.updateCurrentGroup(_id, gid).then(() => {
            res.status(200).send({
                message: 'Updated current group'
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    updateGroup(req, res) {
        const _id = new mongodb_1.ObjectId(req.body._id);
        const groups = req.body.groups;
        settings_model_1.Settings.updateGroup(groups, _id).then(() => {
            res.status(200).send({
                groups
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    updateCategory(req, res) {
        const _id = new mongodb_1.ObjectId(req.body._id);
        const categories = req.body.categories;
        const deletedId = req.body.deletedId;
        settings_model_1.Settings.updateCategories(categories, _id).then(() => {
            if (deletedId) {
                products_model_1.Products.deleteProducts(deletedId).then(() => {
                    res.status(200).send({
                        categories
                    });
                }).catch((error) => {
                    console.log(error);
                    res.status(500).send({
                        message: response_code_json_1.default[500]
                    });
                });
            }
            else {
                res.status(200).send({
                    categories
                });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    updateExpense(req, res) {
        const _id = new mongodb_1.ObjectId(req.body._id);
        const expenses = req.body.expenses;
        settings_model_1.Settings.updateExpenses(expenses, _id).then(() => {
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
    getProducts(req, res) {
        const uid = new mongodb_1.ObjectId(req.body._id);
        const cid = req.params.cid;
        products_model_1.Products.getProducts(uid, cid).toArray().then((products) => {
            res.status(200).send(products);
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    addProduct(req, res) {
        const product = req.body.product;
        product.uid = new mongodb_1.ObjectId(req.body._id);
        products_model_1.Products.addProduct(product).then((result) => {
            product._id = result.insertedId;
            delete product.uid;
            res.status(200).send({
                product
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(response_code_json_1.default[500]);
        });
    }
    editProduct(req, res) {
        const product = req.body.product;
        product._id = new mongodb_1.ObjectId(product._id);
        products_model_1.Products.editProduct(product).then(() => {
            res.status(200).send({
                product
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    deleteProduct(req, res) {
        const _id = new mongodb_1.ObjectId(req.params.productId);
        products_model_1.Products.deleteProduct(_id).then(() => {
            res.status(200).send({
                message: 'Product Deleted'
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    updateGetProductsView(req, res) {
        const _id = new mongodb_1.ObjectId(req.body._id);
        const getProductsView = req.body.getProductsView;
        settings_model_1.Settings.updateGetProductsView(getProductsView, _id).then(() => {
            res.status(200).send({
                message: 'getProducts updated'
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
}
exports.default = SettingsController;
//# sourceMappingURL=settings.controller.js.map