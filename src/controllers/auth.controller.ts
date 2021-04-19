import express, {
    response
} from 'express';
import {
    InsertOneWriteOpResult,
    MongoError,
    ObjectId,
} from 'mongodb';

import path from 'path';

import User, {
    UserModel
} from './../models/user.model';

import {
    Settings
} from './../models/settings.model';

import HelperUtil from './../util/helper.util';

import responseCode from './../json/response-code.json';
import validateToken from '../middlewares/validate-token.middleware';
import decodeToken from '../middlewares/decode-token.middleware';

export default class AuthController {

    private _router: express.Router = express.Router();

    private serverLink: string = 'https://sheltered-castle-03171.herokuapp.com/';
    // private serverLink: string = 'http://localhost:3000/';

    get router(): express.Router {
        return this._router;
    }

    constructor() {
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
        this.router.get('/get-password-recover-link/:email', this.getPasswordRecoveryLink);
        this.router.get('/password-recovery-page/:token', decodeToken, this.getPasswordRecoveryPage);
        this.router.post('/reset-password/:token', decodeToken, this.resetPassword);
        this.router.get('/get-activation-link/:email', this.getActivationLink);
        this.router.get('/activate-account/:token', this.activateAccount);
        this.router.get('/check-auth-status', validateToken, this.checkAuthStatus);
        this.router.get('/get-user-details', validateToken, this.getUserDetails);
        this.router.patch('/update-user-name', validateToken, this.updateUserName);
        this.router.patch('/update-user-password', validateToken, this.updateUserPassword);
    }

    private register(req: express.Request, res: express.Response): void {

        let userData: UserModel = req.body;

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
                        userData.activated = false;

                        User.register(userData).then(
                            (user: InsertOneWriteOpResult < any > ) => {
                                Settings.updateGetProductsView('all', new ObjectId(user.insertedId)).then(
                                    () => {
                                        res.status(200).send({
                                            registered: true,
                                            message: 'User registered successfully'
                                        });
                                    }
                                ).catch((error: MongoError) => {
                                    console.log(error);
                                    res.status(500).send(responseCode[500]);
                                });
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

    private login(req: express.Request, res: express.Response): void {
        let userData: UserModel = req.body;

        User.findUser({
            email: userData.email
        }).then(
            (user: UserModel) => {
                if (user.activated) {
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
                            }, 86400 * 365 * 10, (error: Error, token: string) => {
                                if (error) {
                                    console.log(error);
                                    res.status(500).send({
                                        auth: false,
                                        message: responseCode[500]
                                    });
                                }
                                res.status(200).send({
                                    auth: true,
                                    activated: true,
                                    token
                                });
                            });
                        } else {
                            res.status(401).send({
                                auth: false,
                                message: responseCode[401]
                            });
                            return;
                        }
                    });
                } else {
                    res.status(200).send({
                        auth: false,
                        activated: false,
                        message: 'Account Not Activated'
                    });
                }
            }
        ).catch(error => {
            console.log(error);
            res.status(401).send({
                auth: false,
                message: responseCode[401]
            });
        });
    }

    private checkAuthStatus(req: express.Request, res: express.Response): void {
        res.status(200).send({
            auth: true
        });
    }

    private getUserDetails(req: express.Request, res: express.Response): void {
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
        });
    }

    private updateUserName(req: express.Request, res: express.Response): void {
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
                });
            }
        ).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send(responseCode[500]);
        });
    }

    private updateUserPassword(req: express.Request, res: express.Response): void {

        const _id: ObjectId = new ObjectId(req.body._id);
        const oldPassword: string = req.body.oldPassword;
        const newPassword: string = req.body.newPassword;

        User.findUser({
            _id
        }).then(
            (user: UserModel) => {
                if (user) {
                    HelperUtil.compareHash(oldPassword, user.password, (error: Error, same: boolean) => {
                        if (error) {
                            console.log(error);
                            res.status(500).send({
                                message: responseCode[500]
                            });
                            return;
                        }
                        if (same) {
                            HelperUtil.genrateHash(newPassword, (error: Error, password: string) => {
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
                                });
                            });
                        } else {
                            res.status(401).send({
                                message: 'The old password provided was invalid.'
                            });
                        }
                    });
                }
            }
        ).catch((error: MongoError) => {
            console.log(error);
            res.status(500).send({
                message: responseCode[500]
            });
        });

    }

    private getPasswordRecoveryLink(req: express.Request, res: express.Response) {
        const email: string = req.params.email;

        // First check if the email is registered
        User.findUser({
            email
        }).then(
            user => {
                if (user) {
                    // we are setting type as reset here. Since we are using the same procedure to generate a login token,
                    // we need to set type as reset to make sure the user has not provided login token to reset password
                    HelperUtil.signToken({
                        _id: user._id,
                        time: Date.now(),
                        type: 'reset',
                        expired: false
                    }, 86400, (err, token) => {
                        if (err) {
                            return res.status(500).send({
                                message: responseCode[500]
                            });
                        }
                        // lastReset token is the token provided and we are making it valid.
                        // after a user resets his password, the token will be made invalid and cant be used again
                        User.updateUserData({
                            email
                        }, {
                            lastResetToken: token,
                            resetTokenValid: true
                        }).then(
                            updated => {
                                if (updated) {
                                    res.status(200).send({
                                        message: 'Reset link mailed to the email address. Please follow the link to reset your password.'
                                    });
                                    HelperUtil.sendMail(email, 'Password Reset Link', `${this.serverLink}auth/password-recovery-page/${token}`);
                                }
                            }, error => {
                                console.log(error);
                                res.status(500).send({
                                    message: responseCode[500]
                                });
                            }
                        )
                    });
                } else {
                    res.status(404).send({
                        message: 'Email address not found.'
                    });
                }
            }, error => {
                console.log(error)
                res.status(404).send({
                    message: 'Email address not found.'
                });
            }
        )
    }

    private getPasswordRecoveryPage(req: express.Request, res: express.Response) {
        const decoded: {
            type: string,
            _id: string,
            time: Date
        } = req.body.decoded;
        if (decoded.type === 'reset') {
            res.render(path.join(__dirname, './../', 'html', 'recovery-page'), {
                token: req.params.token
            });
        }
    }

    private resetPassword(req: express.Request, res: express.Response) {
        const newPassword = req.body.newPassword.trim();
        const confirmPassword = req.body.confirmPassword.trim();
        const decoded: {
            type: string,
            _id: string,
            time: Date
        } = req.body.decoded;

        if (newPassword === confirmPassword) {
            // allow reset only if the token is of the type reset
            if (decoded.type !== 'reset') {
                return res.status(400).send({
                    message: 'Invalid token provided'
                });
            }

            User.findUser({
                _id: new ObjectId(decoded._id)
            }).then(
                user => {
                    HelperUtil.verifyToken(user['lastResetToken'], (err, lastTokenDecoded) => {
                        if (err) {
                            return res.status(500).send({
                                message: responseCode[500]
                            });
                        }

                        // The token provided should have timestamp equal to the lastToken sent.
                        // If the the time is less, it means that a new token was issued after this provided token
                        // which will make this token invalid.
                        if (decoded.time < lastTokenDecoded.time) {
                            return res.status(400).send({
                                message: 'The password reset link has expired.',
                                expired: true
                            });
                        }

                        //If the user tries to use same link to reset password more than once, send link expired.
                        if ((req.params.token === user['lastResetToken']) && !user['resetTokenValid']) {
                            return res.status(400).send({
                                message: 'The password reset link has expired.',
                                expired: true
                            });
                        }

                        HelperUtil.genrateHash(newPassword, (err: Error, hash: string) => {
                            if (err) {
                                console.log(err)
                                return res.status(500).send({
                                    message: responseCode[500]
                                });
                            }
                            // set the token as invalid after the token has been used for password reset
                            User.updateUserData({
                                email: user.email
                            }, {
                                password: hash,
                                resetTokenValid: false
                            }).then(
                                () => {
                                    res.status(200).send({
                                        message: 'Password reset successfully.'
                                    });
                                }
                            ).catch(err => {
                                console.log(err);
                                res.status(500).send({
                                    message: responseCode[500]
                                });
                            });
                        })
                    })
                }
            )
        }

    }

    private getActivationLink(req: express.Request, res: express.Response) {
        const email = req.params.email;

        User.findUser({
            email
        }).then(
            (user: UserModel) => {
                if (!user.activated) {
                    HelperUtil.signToken({
                        _id: user._id,
                        type: 'activation'
                    }, 86400, (err, token) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).send({
                                message: responseCode[500]
                            });
                        }
                        if (token) {
                            res.status(200).send({
                                activated: false,
                                created: true,
                                token
                            });

                            HelperUtil.sendMail(email, `GroceryManager: Account Activation`, `<a href="${this.serverLink}auth/activate-account/${token}">Click to authenticate</a>`).then(
                                () => {
                                    console.log('Email sent successfully to: ' + email);
                                }
                            ).catch(err => {
                                console.log(err);
                                return res.status(500).send({
                                    created: false,
                                    message: responseCode[500]
                                });
                            });
                        }
                    });
                } else {
                    return res.status(200).send({
                        activated: true,
                        message: 'Your account is already active.'
                    });
                }
            }
        ).catch(error => {
            console.log(error)
            return res.status(500).send({
                message: responseCode[500]
            });
        });
    }

    private activateAccount(req: express.Request, res: express.Response) {
        HelperUtil.verifyToken(req.params.token, (err: Error, decoded: {
            _id: string,
            type: string
        }) => {
            if (err) {
                return res.status(500).send({
                    message: responseCode[500]
                });
            }

            if (decoded.type === 'activation') {
                User.updateUserData({
                    _id: new ObjectId(decoded._id)
                }, {
                    activated: true
                }).then(
                    () => {
                        return res.render(path.join(__dirname, './../', 'html', 'activation-page.ejs'));
                    }
                ).catch(
                    err => {
                        console.log(err);
                        res.status(500).send({
                            message: responseCode[500]
                        });
                    })
            }
        });
    }

}