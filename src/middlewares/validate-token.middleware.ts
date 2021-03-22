import express, {
    NextFunction
} from 'express';

import HelperUtil from './../util/helper.util';

import responseCode from './../json/response-code.json';

const app = express();

const validateToken = app.use(
    (req: express.Request, res: express.Response, next: NextFunction) => {
        let token: string;
        try {
            token = req.headers['x-access-token'].toString();
        } catch (err) {
            token = '';
        }

        if (token) {
            HelperUtil.verifyToken(token, (error: Error, decoded: any) => {
                if (error) {
                    console.log(error)
                    res.status(401).send({
                        auth: false,
                        message: responseCode[401]
                    });
                    return;
                }
                if (decoded) {
                    req.body['_id'] = decoded._id;
                    next();
                }
            });
        } else {
            res.status(401).send({
                auth: false,
                message: responseCode[401]
            });
        }


    }
);

export default validateToken;