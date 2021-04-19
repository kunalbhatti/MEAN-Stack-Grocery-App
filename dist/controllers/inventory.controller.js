"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class InventoryController {
    constructor() {
        this._router = express_1.default.Router();
        this.router.patch('/updateInventory', this.updateInventory);
    }
    get router() {
        return this._router;
    }
    updateInventory(req, res) {
    }
}
exports.default = InventoryController;
//# sourceMappingURL=inventory.controller.js.map