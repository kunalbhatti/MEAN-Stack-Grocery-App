import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import config from './../json/config.json';

import fs from 'fs';

export default class HelpeUtil {

    static genrateHash(str: string, cb: (error: Error, hash: string) => void) {
        bcrypt.hash(str, 8, (error: Error, hash: string) => {
            cb(error, hash);
        })
    }

    static compareHash(str: string, hash: string, cb: (error: Error, same: boolean) => void) {
        bcrypt.compare(str, hash, (error: Error, same: boolean) => {
            cb(error, same);
        })
    }

    static signToken(payload: any, expiresIn: number, cb: (error: Error, token: string) => void) {
        jwt.sign(payload, config.jwt_key, {
            expiresIn
        }, (error: Error, token: string) => {
            cb(error, token);
        })
    }

    static verifyToken(token: string, cb: (error: Error, decoded: any) => void) {
        jwt.verify(token, config.jwt_key, (error: Error, decoded: any) => {
            cb(error, decoded);
        })
    }

    static sendMail(to: string, subject: string, html: string) {

        sgMail.setApiKey(config.api_key);

        const msg = {
            to,
            from: config.from,
            subject,
            html
        }

        return sgMail.send(msg);
    }
}