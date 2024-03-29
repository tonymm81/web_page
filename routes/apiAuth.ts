import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ServerError } from '../errors/errorHalndler';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';

const apiAuthRouter: express.Router = express.Router();

const prisma: PrismaClient = new PrismaClient();

apiAuthRouter.use(express.json());



apiAuthRouter.post("/login", async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    let hash = crypto.createHash("SHA512").update(req.body.password).digest("hex");
    try {

        const AppUser = await prisma.user_data.findFirst({
            where: {
                user_name: req.body.userName
            }
        });

        if (req.body.userName === AppUser?.user_name) {

            let hash = crypto.createHash("SHA512").update(req.body.password).digest("hex");
            if (hash === AppUser?.user_pwd) {

                let token = jwt.sign({ id: AppUser.user_id, username: AppUser.user_name }, String(process.env.ACCESS_TOKEN_KEY));
                res.json({ token: token, username: AppUser.user_name, who_is_logging: AppUser.who_is_logging, user_id: AppUser.user_id })

            } else {
                next(new ServerError(401, "Wrong username or password"));
            }

        } else {
            next(new ServerError(401, "Wrong username or password"));
        }

    } catch {
        next(new ServerError());
    }

});
apiAuthRouter.post("/login/getsSecondary", async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    let token_from_client = req.body.Response_from_google
    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_CAPTCHA}&response=${token_from_client}`)
        if (response.data.success) {
            let tokenSecondary = jwt.sign({}, String(process.env.ACCESS_TOKEN_KEY_SECONDARY));
            res.json(tokenSecondary)
        } else {
            next(new ServerError(401, "unauthorized"));
        }



    } catch {
        next(new ServerError(401, "unauthorized"));
    }

});



export default apiAuthRouter;
