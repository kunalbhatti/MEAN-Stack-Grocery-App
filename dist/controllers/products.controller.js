"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_model_1 = require("./../models/products.model");
const validate_token_middleware_1 = __importDefault(require("./../middlewares/validate-token.middleware"));
const mongodb_1 = require("mongodb");
const response_code_json_1 = __importDefault(require("./../json/response-code.json"));
class ProductsController {
    constructor() {
        this._router = express_1.default.Router();
        this.router.get('/filter-products', validate_token_middleware_1.default, this.filterProducts);
        this.router.get('/get-inventory', validate_token_middleware_1.default, this.getInventory);
        this.router.get('/get-cart', validate_token_middleware_1.default, this.getCart);
        this.router.patch('/update-stock-count/:pid', validate_token_middleware_1.default, this.updateStockCount);
        this.router.patch('/update-stock-status/:pid', validate_token_middleware_1.default, this.updateStockStatus);
        this.router.patch('/update-cart-count/:pid', validate_token_middleware_1.default, this.updateCartCount);
    }
    get router() {
        return this._router;
    }
    filterProducts(req, res) {
        const uid = new mongodb_1.ObjectId(req.body._id);
        let searchStr = req.query.searchStr.toString();
        // removing special characters from the string
        searchStr = searchStr.replace(/[^a-zA-Z]/g, "");
        const gid = req.query.gid.toString();
        const cid = req.query.cid.toString();
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
        };
        const normalFilter = {
            $and: [{
                    uid
                }, {
                    name: {
                        $regex: `^.*${searchStr}.*$`,
                        $options: 'i'
                    }
                }]
        };
        products_model_1.Products.filterProducts(cid ? categoryFilter : normalFilter).toArray().then((products) => {
            products.map((product) => {
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
            });
            res.status(200).send(products);
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ message: response_code_json_1.default[500] });
        });
    }
    getInventory(req, res) {
        const uid = new mongodb_1.ObjectId(req.body._id);
        const gid = req.query.gid.toString();
        const cid = req.query.cid.toString();
        const getProductView = req.query.getProductsView.toString();
        let productViewFilter = {};
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
            };
        }
        const categoryFilter = {
            $and: [{
                    uid
                }, productViewFilter, {
                    cid
                },]
        };
        const normalFilter = {
            $and: [{
                    uid
                }, productViewFilter]
        };
        products_model_1.Products.getInventory(cid ? categoryFilter : normalFilter).toArray().then((products) => {
            products.map((product) => {
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
            });
            res.status(200).send(products);
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ message: response_code_json_1.default[500] });
        });
    }
    getCart(req, res) {
        const uid = new mongodb_1.ObjectId(req.body._id);
        const gid = req.query.gid.toString();
        const cid = req.query.cid.toString();
        const normalFilter = {
            $and: [{
                    uid
                }, {
                    [`cart.${gid}`]: {
                        $gt: 0
                    }
                }]
        };
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
        };
        products_model_1.Products.getInventory(cid ? categoryFilter : normalFilter).toArray().then((products) => {
            products.map((product) => {
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
            });
            res.status(200).send(products);
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    updateStockCount(req, res) {
        const pid = new mongodb_1.ObjectId(req.params.pid);
        const count = +req.body.count;
        const gid = req.body.gid;
        const filter = {
            _id: pid
        };
        products_model_1.Products.updateStockCount(filter, count, gid).then(() => {
            res.status(200).send({
                updated: true
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(response_code_json_1.default[500]);
        });
    }
    updateStockStatus(req, res) {
        const pid = new mongodb_1.ObjectId(req.params.pid);
        const status = req.body.status;
        const gid = req.body.gid;
        const filter = {
            _id: pid
        };
        products_model_1.Products.updateStockStatus(filter, status, gid).then(() => {
            res.status(200).send({
                updated: true
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(response_code_json_1.default[500]);
        });
    }
    updateCartCount(req, res) {
        const pid = new mongodb_1.ObjectId(req.params.pid);
        const count = +req.body.count;
        const gid = req.body.gid;
        const filter = {
            _id: pid
        };
        products_model_1.Products.updateCartCount(filter, count, gid).then(() => {
            res.status(200).send({
                updated: true
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(response_code_json_1.default[500]);
        });
    }
}
exports.default = ProductsController;
//# sourceMappingURL=products.controller.js.map