import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiWorkTimeRouter : express.Router = express.Router();

apiWorkTimeRouter.use(express.json());



apiWorkTimeRouter.post("/employeedata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log("are we posting employee", req.body)
      if (req.body.description.length > 0) {

        try {

            await prisma.user_data.update({
                where : {
                    user_id : Number(req.body.employee_worktime_id),
                },
                data: {
                  
                    //muokattuPWM : req.body.muokattuPWM,
                    employee_data : {
                        create : {
                                datetime_emp : new Date(req.body.datetime),
                                hours_employee : req.body.hours_employee,
                                description : req.body.description,
                                jobID : req.body.jobID,
                                employeeName : req.body.employee_name
                        },
                    },
                },
            })
            console.log("did it?")
            res.json(prisma.employee_data.findMany({where: {employee_worktime_id : req.body.user_id }}));
    
        } catch (e : any) {
            next(new ServerError(400, "db error"))
        }

    } else {
        next(new ServerError(400, "ServerErrorellinen pyynnön body"));
    } 

});

apiWorkTimeRouter.post("/employerdata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log("employer data add", req.body) 
    if (req.body.employee?.length > 0) {

      try {
        console.log("employer data add", req.body) 
          await prisma.employer_data.create({
              data : {
                  payment : Number(req.body.payment),
                  vat : Number(req.body.vat),
                  employee_name : String(req.body.employee_name),
                  workid_s : String(req.body.workIDS)
              }
          });
          console.log("just for sure")
          res.json(await prisma.employer_data.findMany({}));
  
      } catch (e : any) {
            console.log("database error", e)
          next(new ServerError(400, "database error"))
      }

  } else {
      next(new ServerError(400, "ServerError"));
  } 

});

apiWorkTimeRouter.get("/employeedata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    req.query.employee_worktime_id = String(1)
     try {
        if (req.query.id){
            res.json(await prisma.employee_data.findMany({where : 
                {employee_worktime_id : Number(req.query.employee_worktime_id)}}))
        }
        
    } catch (e: any) {
        next(new ServerError());
    }
    

});

apiWorkTimeRouter.get("/employerdata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {
       res.json(await prisma.employer_data.findMany({}));
    } catch (e : any) {
        next(new ServerError());
    }

});

export default apiWorkTimeRouter;