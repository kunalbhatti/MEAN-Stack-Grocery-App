import express from 'express';
import {
    InsertOneWriteOpResult,
    MongoError,
    ObjectId,
    UpdateWriteOpResult
} from 'mongodb';
import User, {
    UserModel
} from './../models/user.model';

import HelperUtil from './../util/helper.util';

import responseCode from './../json/response-code.json';
import validateToken from '../middlewares/validate-token.middleware';

export default class AuthController {

    private _router: express.Router = express.Router();

    get router(): express.Router {
        return this._router;
    }

    constructor() {
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
        this.router.get('/check-auth-status', validateToken, this.checkAuthStatus);
        this.router.get('/get-user-details', validateToken, this.getUserDetails);
        this.router.patch('/update-user-name', validateToken, this.updateUserName);
        this.router.patch('/update-user-password', validateToken, this.updateUserPassword);
    }

    private register(req: express.Request, res: express.Response) {

        let userData: UserModel = req.body;

        console.log(userData)

        User.findUser({
            email: userData.email
        }).then(
            (user: UserModel) => {
                if (user) {
                    res.status(409).send({
                        registered: false,
                        message: responseCode[409]
                    });
                    return;
                } else {
                    HelperUtil.genrateHash(userData.password, (error: Error, hash: string) => {

                        if (error) {
                            console.log(error);
                            res.status(500).send({
                                registered: false,
                                message: responseCode[500]
                            });
                            return;
                        }

                        userData.password = hash;

                        User.register(userData).then(
                            (result: InsertOneWriteOpResult < any > ) => {
                                res.status(200).send({
                                    registered: true,
                                    message: 'User registered successfully'
                                })
                            }
                        ).catch((error: MongoError) => {
                            console.log(error);
                            res.status(500).send({
                                registered: false,
                                message: responseCode[500]
                            });
                        });
                    });
                }
            }
        ).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send({
                registered: false,
                message: responseCode[500]
            });
        });
    }

    private login(req: express.Request, res: express.Response) {
        let userData: UserModel = req.body;

        User.findUser({
            email: userData.email
        }).then(
            (user: UserModel) => {
                HelperUtil.compareHash(userData.password, user.password, (error: Error, same: boolean) => {
                    if (error) {
                        console.log(error);
                        res.status(500).send({
                            auth: false,
                            message: responseCode[500]
                        });
                        return;
                    }
                    if (same) {
                        HelperUtil.signToken({
                            _id: user._id,
                            type: 'login'
                        }, 86400, (error: Error, token: string) => {
                            if (error) {
                                console.log(error);
                                res.status(500).send({
                                    auth: false,
                                    message: responseCode[500]
                                });
                            }
                            res.status(200).send({
                                auth: true,
                                token
                            })
                        })
                    } else {
                        res.status(401).send({
                            auth: false,
                            message: responseCode[401]
                        });
                        return;
                    }
                });
            }
        ).catch(error => {
            console.log(error);
            res.status(401).send({
                auth: false,
                message: responseCode[401]
            });
        });
    }

    checkAuthStatus(req: express.Request, res: express.Response) {
        res.status(200).send({
            auth: true
        });
    }

    getUserDetails(req: express.Request, res: express.Response) {
        User.findUser({
            _id: new ObjectId(req.body._id)
        }).then((user: UserModel) => {

            res.status(200).send({
                name: user.name
            });
        }).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        })
    }

    updateUserName(req: express.Request, res: express.Response) {
        const name = req.body.name;

        User.updateUserData({
            _id: new ObjectId(req.body._id)
        }, {
            name
        }).then(
            () => {
                res.status(200).send({
                    name,
                    message: 'Name udpated successfully'
                })
            }
        ).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send(responseCode[500]);
        });
    }

    updateUserPassword(req: express.Request, res: express.Response) {
        const password = req.body.password;

        HelperUtil.genrateHash(password, (error: Error, password: string) => {
            if (error) {
                console.log(error);
                res.status(500).send({
                    message: responseCode[500]
                });
                return;
            }

            User.updateUserData({
                _id: new ObjectId(req.body._id)
            }, {
                password
            }).then(
                () => {
                    res.status(200).send({
                        message: 'Password updated successfully'
                    });
                }
            ).catch((error: MongoError) => {
                console.log(error);
                res.status(500).send({
                    messsage: responseCode[500]
                });
            })
        })
    }
}