import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiOstoksetRouter : express.Router = express.Router();

apiOstoksetRouter.use(express.json());



apiOstoksetRouter.post("/employeedata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
 
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

apiOstoksetRouter.post("/employerdata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
 
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

apiOstoksetRouter.get("/employee", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

     try {

        /*if (await prisma.kommentit.count({
            where : {
                kommenttiId : Number(req.params.id)
            }
        }) === 1) {
            res.json(await prisma.kommentit.findUnique({
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

apiOstoksetRouter.get("/employer", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {
       /* res.json(await prisma.uutiset.findMany({
            where : {
                uutisId : Number(res.locals.kayttaja.id)
            }
        }));*/
    } catch (e : any) {
        next(new ServerError());
    }

});

export default apiOstoksetRouter;