"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helper_util_1 = __importDefault(require("./../util/helper.util"));
const response_code_json_1 = __importDefault(require("./../json/response-code.json"));
const app = express_1.default();
const validateToken = app.use((req, res, next) => {
    let token;
    try {
        token = req.headers['x-access-token'].toString();
    }
    catch (err) {
        token = '';
    }
    if (token) {
        helper_util_1.default.verifyToken(token, (error, decoded) => {
            if (error) {
                console.log(error);
                res.status(401).send({
                    auth: false,
                    message: response_code_json_1.default[401]
                });
                return;
            }
            if (decoded) {
                req.body['_id'] = decoded._id;
                next();
            }
        });
    }
    else {
        res.status(401).send({
            auth: false,
            message: response_code_json_1.default[401]
        });
    }
});
exports.default = validateToken;
//# sourceMappingURL=validate-token.middleware.js.map