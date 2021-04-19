"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const settings_controller_1 = __importDefault(require("../controllers/settings.controller"));
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const expenses_controller_1 = __importDefault(require("../controllers/expenses.controller"));
const db_util_1 = require("./../util/db.util");
const port = process.env.PORT || 3000;
class Server {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.app.set('view engine', 'ejs');
        this.http = http_1.default.createServer(this.app);
    }
    initializeMiddlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({
            extended: true
        }));
    }
    initializeControllers() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'www')));
        this.app.use('/auth', new auth_controller_1.default().router);
        this.app.use('/settings', new settings_controller_1.default().router);
        this.app.use('/products', new products_controller_1.default().router);
        this.app.use('/expenses', new expenses_controller_1.default().router);
        this.app.get('/*', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, 'www/index.html'));
        });
    }
    startServer() {
        db_util_1.connectToMongo(() => {
            this.http.listen(this.port, () => {
                this.initializeMiddlewares();
                this.initializeControllers();
                console.log(`Server listening on port:` + this.port);
            });
        });
    }
}
new Server(port).startServer();
//# sourceMappingURL=index.js.map