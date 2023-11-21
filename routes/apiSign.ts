import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ServerError } from '../errors/errorHalndler';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const apiSignRouter : express.Router = express.Router();

const prisma : PrismaClient = new PrismaClient();

apiSignRouter.use(express.json());

apiSignRouter.post("/signin", async (req : express.Request, res : express.Response, next : express.NextFunction) : Promise<void> => {
    console.log("tuleeko signinnii", req.body)

    let crypted = crypto.createHash("SHA512").update(req.body.passwd).digest("hex");
    console.log(req.body)
    try {
       await prisma.user_data.create({
            data : {
                
                user_name : String(req.body.userName),
                user_pwd : crypted,
                user_error : req.body.user_error,
                who_is_logging : String(req.body.who_is_logging)
                
            }
        });
       
       res.json({tunnukset:true})
       

             

           

    } catch {
        next(new ServerError());
    }

});

export default apiSignRouter;
