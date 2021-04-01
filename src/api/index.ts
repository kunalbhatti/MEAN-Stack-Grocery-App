import express from 'express';
import http from 'http';
import cors from 'cors';

import AuthController from '../controllers/auth.controller';
import SettingsController from '../controllers/settings.controller';

import {
    connectToMongo
} from './../util/db.util';
import ProductsController from '../controllers/products.controller';
import {
    ExpensesController
} from '../controllers/expenses.controller';

const port: string | number = process.env.PORT || 3000;

class Server {
    private app: express.Application;
    private http: http.Server;

    constructor(private port: string | number) {
        this.app = express();
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
        this.app.use('/auth', new AuthController().router);
        this.app.use('/settings', new SettingsController().router);
        this.app.use('/products', new ProductsController().router);
        this.app.use('/expenses', new ExpensesController().router);
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