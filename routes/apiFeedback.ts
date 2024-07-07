import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ServerError } from '../errors/errorHalndler';

const apiFeedbackRouter: express.Router = express.Router();

const prisma: PrismaClient = new PrismaClient();

apiFeedbackRouter.use(express.json());

apiFeedbackRouter.post("/saveFeedback", async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        await prisma.feedback.create({
            data : {
                
                feedbackName : String(req.body.feedbackName),
                feedback : String(req.body.feedback),
                timeFeedback : req.body.timeFeedback,
                feedbackRate : Number(req.body.feedbackRate)
                
            }
        });
       
       res.json({tunnukset:true})
       
       
       
    } catch {
        next(new ServerError());
    }

});



export default apiFeedbackRouter;
