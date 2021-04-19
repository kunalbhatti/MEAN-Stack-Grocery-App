"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_json_1 = __importDefault(require("./../json/config.json"));
class HelpeUtil {
    static genrateHash(str, cb) {
        bcrypt_1.default.hash(str, 8, (error, hash) => {
            cb(error, hash);
        });
    }
    static compareHash(str, hash, cb) {
        bcrypt_1.default.compare(str, hash, (error, same) => {
            cb(error, same);
        });
    }
    static signToken(payload, expiresIn, cb) {
        jsonwebtoken_1.default.sign(payload, config_json_1.default.jwt_key, {
            expiresIn
        }, (error, token) => {
            cb(error, token);
        });
    }
    static verifyToken(token, cb) {
        jsonwebtoken_1.default.verify(token, config_json_1.default.jwt_key, (error, decoded) => {
            cb(error, decoded);
        });
    }
    static sendMail(to, subject, html) {
        mail_1.default.setApiKey(config_json_1.default.api_key);
        const msg = {
            to,
            from: config_json_1.default.from,
            subject,
            html
        };
        return mail_1.default.send(msg);
    }
}
exports.default = HelpeUtil;
//# sourceMappingURL=helper.util.js.map