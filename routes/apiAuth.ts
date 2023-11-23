import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ServerError } from '../errors/errorHalndler';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const apiAuthRouter : express.Router = express.Router();

const prisma : PrismaClient = new PrismaClient();

apiAuthRouter.use(express.json());



apiAuthRouter.post("/login", async (req : express.Request, res : express.Response, next : express.NextFunction) : Promise<void> => {
    console.log("loging")
    let hash = crypto.createHash("SHA512").update(req.body.password).digest("hex");
    //console.log(hash)
    try {

        const AppUser = await prisma.user_data.findFirst({
            where : {
                user_name : req.body.userName
            }
        });

        if (req.body.userName === AppUser?.user_name) {

            let hash = crypto.createHash("SHA512").update(req.body.password).digest("hex");
            console.log(hash)
            if (hash === AppUser?.user_pwd) {

                let token = jwt.sign({ id : AppUser.user_id, username : AppUser.user_name }, String(process.env.ACCESS_TOKEN_KEY));
                console.log("kirjautuminen ok")
                res.json({ token : token, username : AppUser.user_name, who_is_logging : AppUser.who_is_logging, user_id : AppUser.user_id  })

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
apiAuthRouter.post("/login/getsSecondary", async (req : express.Request, res : express.Response, next : express.NextFunction) : Promise<void> => {
    console.log("loging token")
    
    //console.log(hash)
    try {

    let tokenSecondary = jwt.sign({ }, String(process.env.ACCESS_TOKEN_KEY_SECONDARY));
    res.json(tokenSecondary)            

    } catch {
        next(new ServerError());
    }

});



export default apiAuthRouter;
