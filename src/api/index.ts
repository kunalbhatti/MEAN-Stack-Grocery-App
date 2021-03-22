import express from 'express';
import http from 'http';
import cors from 'cors';

import  AuthController from '../controllers/auth.controller';
import SettingsController from '../controllers/settings.controller';

import {
    connectToMongo
} from './../util/db.util';

const port: string | number = process.env.PORT || 3000;

class Server {
    private app: express.Application;
    private http: http.Server;

    constructor(private port: string | number) {
        this.app = express();
        this.http = http.createServer(this.app);
    }

    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
    }

    initializeControllers() {
        this.app.use('/auth', new AuthController().router);
        this.app.use('/settings', new SettingsController().router);
    }


    startServer() {
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