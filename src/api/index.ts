import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';

import AuthController from '../controllers/auth.controller';
import SettingsController from '../controllers/settings.controller';
import ProductsController from '../controllers/products.controller';
import ExpensesController from '../controllers/expenses.controller';

import {
    connectToMongo
} from './../util/db.util';

const port: string | number = process.env.PORT || 3000;

class Server {
    private app: express.Application;
    private http: http.Server;

    constructor(private port: string | number) {
        this.app = express();
        this.app.set('view engine', 'ejs');
        this.http = http.createServer(this.app);

    }

    initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
    }

    initializeControllers(): void {
        this.app.use(express.static(path.join(__dirname, 'www')));
        this.app.use('/auth', new AuthController().router);
        this.app.use('/settings', new SettingsController().router);
        this.app.use('/products', new ProductsController().router);
        this.app.use('/expenses', new ExpensesController().router);
        this.app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, 'www/index.html'));
        });
    }

    startServer(): void {
        connectToMongo(() => {
            this.http.listen(this.port, () => {
                this.initializeMiddlewares();
                this.initializeControllers();
                console.log(`Server listening on port:` + this.port);

            });
        });
    }
}

new Server(port).startServer();