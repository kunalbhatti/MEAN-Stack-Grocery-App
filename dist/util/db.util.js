"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectToMongo = void 0;
const mongodb_1 = require("mongodb");
const config_json_1 = __importDefault(require("./../json/config.json"));
const uri = config_json_1.default.mongoDbUri;
let _db;
const connectToMongo = (cb) => {
    mongodb_1.MongoClient.connect(uri, (err, client) => {
        if (err) {
            console.log(err);
            throw 'Error conencting to the database';
        }
        if (client) {
            console.log('Connected to Database');
            if (!_db) {
                _db = client.db();
            }
            cb();
        }
    });
};
exports.connectToMongo = connectToMongo;
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'Not connected to db';
};
exports.getDb = getDb;
//# sourceMappingURL=db.util.js.map