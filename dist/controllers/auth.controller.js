"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const path_1 = __importDefault(require("path"));
const user_model_1 = __importDefault(require("./../models/user.model"));
const settings_model_1 = require("./../models/settings.model");
const helper_util_1 = __importDefault(require("./../util/helper.util"));
const response_code_json_1 = __importDefault(require("./../json/response-code.json"));
const validate_token_middleware_1 = __importDefault(require("../middlewares/validate-token.middleware"));
const decode_token_middleware_1 = __importDefault(require("../middlewares/decode-token.middleware"));
class AuthController {
    constructor() {
        this._router = express_1.default.Router();
        this.serverLink = 'https://sheltered-castle-03171.herokuapp.com/';
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
        this.router.get('/get-password-recover-link/:email', this.getPasswordRecoveryLink);
        this.router.get('/password-recovery-page/:token', decode_token_middleware_1.default, this.getPasswordRecoveryPage);
        this.router.post('/reset-password/:token', decode_token_middleware_1.default, this.resetPassword);
        this.router.get('/get-activation-link/:email', this.getActivationLink);
        this.router.get('/activate-account/:token', this.activateAccount);
        this.router.get('/check-auth-status', validate_token_middleware_1.default, this.checkAuthStatus);
        this.router.get('/get-user-details', validate_token_middleware_1.default, this.getUserDetails);
        this.router.patch('/update-user-name', validate_token_middleware_1.default, this.updateUserName);
        this.router.patch('/update-user-password', validate_token_middleware_1.default, this.updateUserPassword);
    }
    // private serverLink: string = 'http://localhost:3000/';
    get router() {
        return this._router;
    }
    register(req, res) {
        let userData = req.body;
        user_model_1.default.findUser({
            email: userData.email
        }).then((user) => {
            if (user) {
                res.status(409).send({
                    registered: false,
                    message: response_code_json_1.default[409]
                });
                return;
            }
            else {
                helper_util_1.default.genrateHash(userData.password, (error, hash) => {
                    if (error) {
                        console.log(error);
                        res.status(500).send({
                            registered: false,
                            message: response_code_json_1.default[500]
                        });
                        return;
                    }
                    userData.password = hash;
                    userData.activated = false;
                    user_model_1.default.register(userData).then((user) => {
                        settings_model_1.Settings.updateGetProductsView('all', new mongodb_1.ObjectId(user.insertedId)).then(() => {
                            res.status(200).send({
                                registered: true,
                                message: 'User registered successfully'
                            });
                        }).catch((error) => {
                            console.log(error);
                            res.status(500).send(response_code_json_1.default[500]);
                        });
                    }).catch((error) => {
                        console.log(error);
                        res.status(500).send({
                            registered: false,
                            message: response_code_json_1.default[500]
                        });
                    });
                });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                registered: false,
                message: response_code_json_1.default[500]
            });
        });
    }
    login(req, res) {
        let userData = req.body;
        user_model_1.default.findUser({
            email: userData.email
        }).then((user) => {
            if (user) {
                if (user.activated) {
                    helper_util_1.default.compareHash(userData.password, user.password, (error, same) => {
                        if (error) {
                            console.log(error);
                            res.status(500).send({
                                auth: false,
                                message: response_code_json_1.default[500]
                            });
                            return;
                        }
                        if (same) {
                            helper_util_1.default.signToken({
                                _id: user._id,
                                type: 'login'
                            }, 86400 * 365 * 10, (error, token) => {
                                if (error) {
                                    console.log(error);
                                    res.status(500).send({
                                        auth: false,
                                        message: response_code_json_1.default[500]
                                    });
                                }
                                res.status(200).send({
                                    auth: true,
                                    activated: true,
                                    token
                                });
                            });
                        }
                        else {
                            res.status(401).send({
                                auth: false,
                                message: response_code_json_1.default[401]
                            });
                            return;
                        }
                    });
                }
                else {
                    res.status(200).send({
                        auth: false,
                        activated: false,
                        message: 'Account Not Activated'
                    });
                }
            }
            else {
                res.status(404).send({
                    message: 'Email address not found.'
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(401).send({
                auth: false,
                message: response_code_json_1.default[401]
            });
        });
    }
    checkAuthStatus(req, res) {
        res.status(200).send({
            auth: true
        });
    }
    getUserDetails(req, res) {
        user_model_1.default.findUser({
            _id: new mongodb_1.ObjectId(req.body._id)
        }).then((user) => {
            res.status(200).send({
                name: user.name
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    updateUserName(req, res) {
        const name = req.body.name;
        user_model_1.default.updateUserData({
            _id: new mongodb_1.ObjectId(req.body._id)
        }, {
            name
        }).then(() => {
            res.status(200).send({
                name,
                message: 'Name udpated successfully'
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(response_code_json_1.default[500]);
        });
    }
    updateUserPassword(req, res) {
        const _id = new mongodb_1.ObjectId(req.body._id);
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        user_model_1.default.findUser({
            _id
        }).then((user) => {
            if (user) {
                helper_util_1.default.compareHash(oldPassword, user.password, (error, same) => {
                    if (error) {
                        console.log(error);
                        res.status(500).send({
                            message: response_code_json_1.default[500]
                        });
                        return;
                    }
                    if (same) {
                        helper_util_1.default.genrateHash(newPassword, (error, password) => {
                            if (error) {
                                console.log(error);
                                res.status(500).send({
                                    message: response_code_json_1.default[500]
                                });
                                return;
                            }
                            user_model_1.default.updateUserData({
                                _id: new mongodb_1.ObjectId(req.body._id)
                            }, {
                                password
                            }).then(() => {
                                res.status(200).send({
                                    message: 'Password updated successfully'
                                });
                            }).catch((error) => {
                                console.log(error);
                                res.status(500).send({
                                    messsage: response_code_json_1.default[500]
                                });
                            });
                        });
                    }
                    else {
                        res.status(401).send({
                            message: 'The old password provided was invalid.'
                        });
                    }
                });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    getPasswordRecoveryLink(req, res) {
        const email = req.params.email;
        // First check if the email is registered
        user_model_1.default.findUser({
            email
        }).then(user => {
            if (user) {
                // we are setting type as reset here. Since we are using the same procedure to generate a login token,
                // we need to set type as reset to make sure the user has not provided login token to reset password
                helper_util_1.default.signToken({
                    _id: user._id,
                    time: Date.now(),
                    type: 'reset',
                    expired: false
                }, 86400, (err, token) => {
                    if (err) {
                        return res.status(500).send({
                            message: response_code_json_1.default[500]
                        });
                    }
                    // lastReset token is the token provided and we are making it valid.
                    // after a user resets his password, the token will be made invalid and cant be used again
                    user_model_1.default.updateUserData({
                        email
                    }, {
                        lastResetToken: token,
                        resetTokenValid: true
                    }).then(updated => {
                        if (updated) {
                            res.status(200).send({
                                message: 'Reset link mailed to the email address. Please follow the link to reset your password.'
                            });
                            helper_util_1.default.sendMail(email, 'Password Reset Link', `https://sheltered-castle-03171.herokuapp.com/auth/password-recovery-page/${token}`);
                        }
                    }, error => {
                        console.log(error);
                        res.status(500).send({
                            message: response_code_json_1.default[500]
                        });
                    });
                });
            }
            else {
                res.status(404).send({
                    message: 'Email address not found.'
                });
            }
        }, error => {
            console.log(error);
            res.status(404).send({
                message: 'Email address not found.'
            });
        });
    }
    getPasswordRecoveryPage(req, res) {
        const decoded = req.body.decoded;
        if (decoded.type === 'reset') {
            res.render(path_1.default.join(__dirname, './../', 'html', 'recovery-page'), {
                token: req.params.token
            });
        }
    }
    resetPassword(req, res) {
        const newPassword = req.body.newPassword.trim();
        const confirmPassword = req.body.confirmPassword.trim();
        const decoded = req.body.decoded;
        if (newPassword === confirmPassword) {
            // allow reset only if the token is of the type reset
            if (decoded.type !== 'reset') {
                return res.status(400).send({
                    message: 'Invalid token provided'
                });
            }
            user_model_1.default.findUser({
                _id: new mongodb_1.ObjectId(decoded._id)
            }).then(user => {
                if (user) {
                    helper_util_1.default.verifyToken(user['lastResetToken'], (err, lastTokenDecoded) => {
                        if (err) {
                            return res.status(500).send({
                                message: response_code_json_1.default[500]
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
                        helper_util_1.default.genrateHash(newPassword, (err, hash) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).send({
                                    message: response_code_json_1.default[500]
                                });
                            }
                            // set the token as invalid after the token has been used for password reset
                            user_model_1.default.updateUserData({
                                email: user.email
                            }, {
                                password: hash,
                                resetTokenValid: false
                            }).then(() => {
                                res.status(200).send({
                                    message: 'Password reset successfully.'
                                });
                            }).catch(err => {
                                console.log(err);
                                res.status(500).send({
                                    message: response_code_json_1.default[500]
                                });
                            });
                        });
                    });
                }
                else {
                    res.status(404).send({
                        message: 'Email address not found.'
                    });
                }
            });
        }
    }
    getActivationLink(req, res) {
        const email = req.params.email;
        user_model_1.default.findUser({
            email
        }).then((user) => {
            if (user) {
                if (!user.activated) {
                    helper_util_1.default.signToken({
                        _id: user._id,
                        type: 'activation'
                    }, 86400, (err, token) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send({
                                message: response_code_json_1.default[500]
                            });
                        }
                        if (token) {
                            res.status(200).send({
                                activated: false,
                                created: true,
                                token
                            });
                            helper_util_1.default.sendMail(email, `GroceryManager: Account Activation`, `<a href="https://sheltered-castle-03171.herokuapp.com/auth/activate-account/${token}">Click on the link to verify email and activate account.</a>`).then(() => {
                                console.log('Email sent successfully to: ' + email);
                            }).catch(err => {
                                console.log(err);
                                return res.status(500).send({
                                    created: false,
                                    message: response_code_json_1.default[500]
                                });
                            });
                        }
                    });
                }
                else {
                    return res.status(200).send({
                        activated: true,
                        message: 'Your account is already active.'
                    });
                }
            }
            else {
                res.status(404).send({
                    message: 'Email address not found.'
                });
            }
        }).catch(error => {
            console.log(error);
            return res.status(500).send({
                message: response_code_json_1.default[500]
            });
        });
    }
    activateAccount(req, res) {
        helper_util_1.default.verifyToken(req.params.token, (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    message: response_code_json_1.default[500]
                });
            }
            if (decoded.type === 'activation') {
                user_model_1.default.updateUserData({
                    _id: new mongodb_1.ObjectId(decoded._id)
                }, {
                    activated: true
                }).then(() => {
                    return res.render(path_1.default.join(__dirname, './../', 'html', 'activation-page.ejs'));
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({
                        message: response_code_json_1.default[500]
                    });
                });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map