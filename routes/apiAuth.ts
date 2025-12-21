import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ServerError } from '../errors/errorHalndler';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import axios from 'axios';

const apiAuthRouter: express.Router = express.Router();

const prisma: PrismaClient = new PrismaClient();

apiAuthRouter.use(express.json());



apiAuthRouter.post("/login", async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    //let hash = crypto.createHash("SHA512").update(req.body.password).digest("hex");
   try {
    const AppUser = await prisma.user_data.findFirst({
        where: {
            user_name: req.body.userName
        }
    });

    // Jos käyttäjää ei löydy → suoraan virhe
    if (!AppUser) {
        return next(new ServerError(401, "Wrong username or password"));
    }

    // bcrypt-vertailu vasta kun tiedetään että user_pwd on olemassa
    const isMatch = await bcrypt.compare(req.body.password, AppUser.user_pwd);

    if (!isMatch) {
        return next(new ServerError(401, "Wrong username or password"));
    }

    // Tässä vaiheessa kaikki ok → luodaan token
    const token = jwt.sign(
        { id: AppUser.user_id, username: AppUser.user_name },
        String(process.env.ACCESS_TOKEN_KEY)
    );

    res.json({
        token,
        username: AppUser.user_name,
        who_is_logging: AppUser.who_is_logging,
        user_id: AppUser.user_id
    });
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
