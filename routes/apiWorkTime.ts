import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiWorkTimeRouter : express.Router = express.Router();

apiWorkTimeRouter.use(express.json());


apiWorkTimeRouter.get("/employeedata/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    req.query.employee_worktime_id = String(1)
     try {
        if (req.params.id){

            let employeework = await prisma.employee_data.findMany({where : 
                {employee_worktime_id : Number(req.params.id)}})
            let employee_work_places = await prisma.working_ids.findMany({where: {employee_id : Number(req.params.id)}})
            res.json({employeework,employee_work_places})
        }
        
    } catch (e: any) {
        next(new ServerError());
    }
    

});

apiWorkTimeRouter.delete("/employeedata/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

});


apiWorkTimeRouter.put("/employeedata/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

});


apiWorkTimeRouter.post("/employeedata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log("are we posting employee", req.body.employee_worktime_id)
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
            res.json(prisma.employee_data.findMany({where: {employee_worktime_id : Number(req.body.employee_worktime_id) }}));
    
        } catch (e : any) {
            console.log("db error", e)
            next(new ServerError(400, "db error"))
        }

    } else {
        next(new ServerError(400, "ServerErrorellinen pyynnön body"));
    } 

});



apiWorkTimeRouter.get("/employerdata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log("are we in get employer data")
    let who = "employee"
    try {
        let employee_names = await prisma.user_data.findMany({
                                                            where: {
                                                            who_is_logging: "employee",
                                                            },
                                                            select: {
                                                            user_name: true,
                                                                },
                                                                });
        let employer_data = await prisma.employer_data.findMany()
        let allEmployees = await prisma.employee_data.findMany()
       res.json({employer_data, allEmployees, employee_names});
    } catch (e : any) {
        console.log("are we in get employer data", e)
        next(new ServerError());
    }

});

apiWorkTimeRouter.delete("/employerdata/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

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
                  employer_work_id : Number(req.body.employee_work_id)
              }
          });
          await prisma.working_ids.create({data: {employee_id : Number(req.body.employee_work_id),
                                                        employee_name : String(req.body.employee_name),
                                                        workplace_id : req.body.workIDS}})
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

apiWorkTimeRouter.put("/employerdata/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

});


export default apiWorkTimeRouter;