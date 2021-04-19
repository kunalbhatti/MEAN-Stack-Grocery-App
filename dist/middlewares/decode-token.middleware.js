"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helper_util_1 = __importDefault(require("./../util/helper.util"));
const response_code_json_1 = __importDefault(require("./../json/response-code.json"));
const router = express_1.default.Router({
    mergeParams: true
});
const decodeToken = router.use((req, res, next) => {
    let token;
    try {
        token = req.params.token;
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
                req.body['decoded'] = decoded;
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
exports.default = decodeToken;
//# sourceMappingURL=decode-token.middleware.js.map