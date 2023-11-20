import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiWorkTimeRouter : express.Router = express.Router();

apiWorkTimeRouter.use(express.json());



apiWorkTimeRouter.post("/employeedata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
 
      if (req.body.tuote?.length > 0) {

        try {

            /*await prisma.kayttaja.create({
                data : {
                    kayttajatunnus : req.body.kayttajatunnus,
                    salasana : req.body.salasana
                    
                }
            });*/
    
            res.json({tunnus: true});
    
        } catch (e : any) {
            next(new ServerError())
        }

    } else {
        next(new ServerError(400, "ServerErrorellinen pyynnön body"));
    } 

});

apiWorkTimeRouter.post("/employerdata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
 
    if (req.body.tuote?.length > 0) {

      try {

          /*await prisma.kayttaja.create({
              data : {
                  kayttajatunnus : req.body.kayttajatunnus,
                  salasana : req.body.salasana
                  
              }
          });*/
  
          res.json({tunnus: true});
  
      } catch (e : any) {
          next(new ServerError())
      }

  } else {
      next(new ServerError(400, "ServerErrorellinen pyynnön body"));
  } 

});

apiWorkTimeRouter.get("/employee", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

     try {

        /*if (await prisma.employee_data.count({
            where : {
                employee_worktime_id : Number(req.params.id)
            }
        }) === 1) {
            res.json(await prisma.employee_data.findUnique({
                where : {
                    kommenttiId : Number(req.params.id)
                }
            }))
        } else {
            next(new ServerError(400, "ServerErrorelinen id"));
        }*/
        
    } catch (e: any) {
        next(new ServerError());
    }
    

});

apiWorkTimeRouter.get("/employer", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {
       res.json(await prisma.employer_data.findMany({}));
    } catch (e : any) {
        next(new ServerError());
    }

});

export default apiWorkTimeRouter;