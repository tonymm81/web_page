import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiNewsRouter : express.Router = express.Router();

apiNewsRouter.use(express.json());


apiNewsRouter.get("/news/everything", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
   
     try {
            res.json(await prisma.news_data.findMany({
                
            }));
        
        
        
    } catch (e: any) {
        next(new ServerError());
    }
    

});

apiNewsRouter.get("/news/top", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    
    try {
        res.json(await prisma.news_data.findMany({
            
        }));
    } catch (e : any) {
        next(new ServerError(200, "joku ServerError"));
    }

});

export default apiNewsRouter;