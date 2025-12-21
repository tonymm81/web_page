import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ServerError } from '../errors/errorHalndler';
import bcrypt from "bcrypt";

const apiSignRouter : express.Router = express.Router();

const prisma : PrismaClient = new PrismaClient();

apiSignRouter.use(express.json());

apiSignRouter.post("/signin", async (req : express.Request, res : express.Response, next : express.NextFunction) : Promise<void> => {
    const saltRounds = 12;
    const hashed = await bcrypt.hash(req.body.password, saltRounds);
    try {
       await prisma.user_data.create({
            data : {
                
                user_name : String(req.body.userName),
                user_pwd : hashed,
                user_error : String(req.body.user_error),
                who_is_logging : String(req.body.who_is_logging)
                
            }
        });
       
       res.json({tunnukset:true})
       

             

           

    } catch(err) {
        next(new ServerError(401, "noouuu"));
        console.log("database error : ",err)
    }

});

export default apiSignRouter;
