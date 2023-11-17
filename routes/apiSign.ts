import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ServerError } from '../errors/errorHalndler';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const apiSignRouter : express.Router = express.Router();

const prisma : PrismaClient = new PrismaClient();

apiSignRouter.use(express.json());

apiSignRouter.post("/signin", async (req : express.Request, res : express.Response, next : express.NextFunction) : Promise<void> => {
    console.log("tuleeko signinnii")

    let hashattu = crypto.createHash("SHA512").update(req.body.salasana).digest("hex");
    try {
        await prisma.user_data.create({
            data : {
                
                user_name : req.body.kayttajatunnus,
                user_pwd : hashattu,
                user_error : ""
                
                
            }
        });
       
       res.json({tunnukset:true})
       

             

           

    } catch {
        next(new ServerError());
    }

});

export default apiSignRouter;
