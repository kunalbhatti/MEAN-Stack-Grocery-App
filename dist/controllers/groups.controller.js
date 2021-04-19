"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsController = void 0;
const express = __importStar(require("express"));
const mongodb_1 = require("mongodb");
const groups_model_1 = require("./../models/groups.model");
const validate_token_middleware_1 = __importDefault(require("./../middlewares/validate-token.middleware"));
const response_code_json_1 = __importDefault(require("./../json/response-code.json"));
class GroupsController {
    constructor() {
        this._router = express.Router();
        this.router.post('/add-group', validate_token_middleware_1.default, this.addGroup);
        this.router.patch('/update-group', validate_token_middleware_1.default, this.updateGroup);
        this.router.delete('/delete-group', validate_token_middleware_1.default, this.deleteGroup);
    }
    get router() {
        return this._router;
    }
    addGroup(req, res) {
        const group = {
            name: req.body.name,
            uid: new mongodb_1.ObjectId(req.body._id)
        };
        groups_model_1.Groups.addGroup(group).then((result) => {
            res.status(200).send({
                id: result.insertedId,
                name: group.name
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(response_code_json_1.default[500]);
        });
    }
    updateGroup(req, res) {
        const name = req.body.name;
        const gid = new mongodb_1.ObjectId(req.body.gid);
        groups_model_1.Groups.updateGroup({
            _id: gid
        }, name).then(() => {
            res.status(200).send({
                message: 'updated group name'
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(response_code_json_1.default[500]);
        });
    }
    deleteGroup(req, res) {
        const gid = new mongodb_1.ObjectId(req.body.gid);
        groups_model_1.Groups.deleteGroup({
            _id: gid
        }).then(() => {
            res.status(200).send({
                message: 'group deleted'
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(response_code_json_1.default[500]);
        });
    }
}
exports.GroupsController = GroupsController;
//# sourceMappingURL=groups.controller.js.map