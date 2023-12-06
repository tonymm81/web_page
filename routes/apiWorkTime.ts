import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';
import { count } from 'console';

const prisma : PrismaClient = new PrismaClient();

const apiWorkTimeRouter : express.Router = express.Router();

apiWorkTimeRouter.use(express.json());


const count_payment_and_hours = async (ids : number) =>{// this will count the specific employee payment and tax informationn from db
    let employee_payment = await prisma.employer_data.findFirst({where: {employer_work_id : ids ,
                                                                        }, select: {payment: true, vat : true}})
    let employee_hour_count = await prisma.employee_data.groupBy({
                                                                by: [ 'employee_worktime_id'],
                                                                where: {employee_worktime_id :ids},
                                                                _sum: {
                                                                hours_employee: true,
                                                                },
                                                                })
    let payment_before_taxes = Number(employee_hour_count[0]?._sum.hours_employee) * Number(employee_payment?.payment)
    let payment_after_taxes = (100 - Number (employee_payment?.vat)) / 100 * payment_before_taxes    // this calculate wrong
    //console.log("what kind of values",payment_after_taxes,payment_before_taxes, employee_hour_count, employee_payment, ids)                                                         
    return [payment_after_taxes, payment_before_taxes, employee_hour_count]
}

const get_employer_data_needed = async () =>{
    let employee_names = await prisma.user_data.findMany({
                                                        where: {
                                                            who_is_logging: "employee",
                                                                },
                                                        select: {
                                                            user_id : true,
                                                            user_name: true,
                                                                },
                                                         });
let employer_data = await prisma.employer_data.findMany()
let allEmployees = await prisma.employee_data.findMany()
let working_places = await prisma.working_ids.findMany()
    return[employer_data, allEmployees, employee_names, working_places]
} //employer_data, allEmployees, employee_names, working_places

apiWorkTimeRouter.get("/employeedata/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    //req.query.employee_worktime_id = String(1)// this will search one specific employee data
    console.log("what is the id", req.params.id)
     try {
        if (req.params.id){
            let get_payment_information = await count_payment_and_hours(Number(req.params.id))
            let employeework = await prisma.employee_data.findMany({where : 
                {employee_worktime_id : Number(req.params.id)}})
            let employee_work_places = await prisma.working_ids.findMany({where: {employee_id : Number(req.params.id)}})
            console.log("where is the problem", get_payment_information, employee_work_places, employeework)
            res.json({employeework,employee_work_places, get_payment_information})
           
        }
        
    } catch (e: any) {
        console.log("error in get route", e)
        next(new ServerError());
    }
    

});

apiWorkTimeRouter.delete("/employeedata/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
   // this will delete the chosen employeedata
    let search_based_user = await prisma.employee_data.findMany({where : 
                                                        {employee_id_auto : Number(req.params.id)},
                                                            select: {employee_worktime_id : true}})
    if (await prisma.employee_data.count({where: {employee_id_auto : Number(req.params.id)}})){
        try{
            await prisma.employee_data.delete({where: {employee_id_auto : Number(req.params.id)}})
            console.log("delete route",search_based_user)
            let employeework = await prisma.employee_data.findMany({where : 
                {employee_worktime_id : Number(search_based_user[0].employee_worktime_id)}})
            let employee_work_places = await prisma.working_ids.findMany({where: {employee_id : Number(search_based_user[0].employee_worktime_id)}})
            let get_payment_information = await count_payment_and_hours(Number(search_based_user[0].employee_worktime_id))
            res.json({employeework,employee_work_places, get_payment_information})

        }catch(show_me_error_oh_mighty_database){
            console.log("error db delete", show_me_error_oh_mighty_database)
            next(new ServerError(404, "ratapase"))
        }
    }
});


apiWorkTimeRouter.put("/employeedata/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log("put", req.body)
    if (await prisma.employee_data.count({// this will edit the chosen employee data
        where : {
            employee_id_auto : Number(req.params.id)
        }
        })) {
        if (req.body.description?.length > 0 ) {

            try {

                await prisma.employee_data.update({
                    where : {
                        employee_id_auto : Number(req.params.id)
                    },
                    data : {
                        datetime_emp : req.body.datetime_emp,
                        hours_employee : req.body.hours_employee,
                        description : req.body.description,
                        jobID : req.body.jobID
                    }
                });
                let employee_worktime_id = await prisma.employee_data.findFirst({where: 
                                                                        {employee_id_auto : Number(req.params.id),
                                                                        }, select : {
                                                                            employee_worktime_id : true
                                                                        }})
                let employeework = await prisma.employee_data.findMany({where : 
                    {employee_worktime_id : Number(employee_worktime_id?.employee_worktime_id)}})
    
                let get_payment_information = await count_payment_and_hours(Number(employee_worktime_id?.employee_worktime_id))
 
                let employee_work_places = await prisma.working_ids.findMany({where: {employee_id : Number(employee_worktime_id?.employee_worktime_id)}})
                res.json({employeework,employee_work_places, get_payment_information})
        
            } catch (e : any) {
                next(new ServerError())
            }

        } else {
            next(new ServerError(400, "Data is faulty"));
        }
    } else {
        next(new ServerError (400, "wrong id"));
    }

});


apiWorkTimeRouter.post("/employeedata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log("are we posting employee", req.body.employee_worktime_id)
      if (req.body.description.length > 0) {// if employee makes a new worktime writing, this will add with relation the data to specific employee

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
            let employeework = await prisma.employee_data.findMany({where : 
                {employee_worktime_id : Number(req.body.employee_worktime_id)}})
            let get_payment_information = await count_payment_and_hours(Number(req.body.employee_worktime_id))

            let employee_work_places = await prisma.working_ids.findMany({where: {employee_id : Number(req.body.employee_worktime_id)}})
            res.json({employeework,employee_work_places, get_payment_information})
    
        } catch (e : any) {
            console.log("db error", e)
            next(new ServerError(400, "db error"))
        }

    } else {
        next(new ServerError(400, "ServerErrorellinen pyynnön body"));
    } 

});



apiWorkTimeRouter.get("/employerdata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log("are we in get employer data", req.body) // when employer are log in, this will return all employer and employee data
    let who = "employee"
    try {
        let employee_names = await prisma.user_data.findMany({
                                                            where: {
                                                            who_is_logging: "employee",
                                                            },
                                                            select: {
                                                            user_id : true,
                                                            user_name: true,
                                                                },
                                                                });
        let employer_data = await prisma.employer_data.findMany()
        let allEmployees = await prisma.employee_data.findMany()
        let working_places = await prisma.working_ids.findMany()
        //let employerdata = await get_employer_data_needed()// this is not working. No matter how i save it in client side. it wont work..
        //console.log(employerdata[0])
        //next()
        //res.json(employerdata)
       res.json({employer_data, allEmployees, employee_names, working_places});
    } catch (e : any) {
        console.log("are we in get employer data", e)
        next(new ServerError(404, "not found"));
    }

});

apiWorkTimeRouter.delete("/employerdata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log("deleting", req.query)// this is not working
    try{
    if (req.query.what_delete === "Workid_delete"){// this will delete only working places
        if (await prisma.working_ids.count({where: {working_id_ids : Number(req.query.working_id_ids)}})){// delete only workplace
            await prisma.working_ids.delete({where: {working_id_ids : Number(req.query.working_id_ids)}})
            console.log("should we delete id:s")
        }
    }
    if (req.query.what_delete === "Delete_all"){// this will delete all data what is related to specific employee
        if (await prisma.employer_data.count({where: {employer_work_id : Number(req.query.working_id_ids)}})){// delete all data specific employee
            let employerdata_id = await prisma.employer_data.findFirst({where: {employer_work_id : Number(req.query.working_id_ids)}, select: {empoyer_data_id : true}}) 
            console.log("should we delete all data", employerdata_id)// repair this it is null
            await prisma.employer_data.delete({where: {empoyer_data_id : Number(employerdata_id?.empoyer_data_id)}})// check
            await prisma.employee_data.deleteMany({where: {employee_worktime_id : Number(req.query.working_id_ids)}})
            await prisma.working_ids.deleteMany({where: {employee_id : Number(req.query.working_id_ids)}})
            await prisma.user_data.delete({where: {user_id : Number(req.query.Employee_id)}})
            // we need to delete user also!!!
        }

    }
        let employee_names = await prisma.user_data.findMany({
            where: {
            who_is_logging: "employee",
         },
            select: {
            user_id : true,
            user_name: true,
            },
            });
        let employer_data = await prisma.employer_data.findMany()
        let allEmployees = await prisma.employee_data.findMany()
        let working_places = await prisma.working_ids.findMany()
       res.json({employer_data, allEmployees, employee_names, working_places});
    }catch(dewleteerror){
        console.log("are we in get employer data", dewleteerror)
        next(new ServerError());   
    }
});

apiWorkTimeRouter.post("/employerdata", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log("employer data add", req.body) // if employee make a new employee data, this will add it to database and get back all employee data to client
    if (req.body.employee_name?.length > 0) {

      try {
        console.log("employer data add", req.body) 
        if(req.body.payment !== undefined){//if new employee, lets add all details
          let employer = await prisma.employer_data.create({
              data : {
                  payment : Number(req.body.payment),
                  vat : Number(req.body.vat),
                  employee_name : String(req.body.employee_name),
                  employer_work_id : Number(req.body.employee_work_id)
              }
          });
        }
        let workid = await prisma.working_ids.create({data: {employee_id : Number(req.body.employee_work_id),
                                                        employee_name : String(req.body.employee_name),
                                                        workplace_id : req.body.workIDS}});
          

        let employee_names = await prisma.user_data.findMany({
                                                            where: {
                                                            who_is_logging: "employee",
                                                            },
                                                            select: {
                                                            user_id : true,
                                                            user_name: true,
                                                                },
                                                                });
        let employer_data = await prisma.employer_data.findMany()
        let allEmployees = await prisma.employee_data.findMany()
        let working_places = await prisma.working_ids.findMany()
       res.json({employer_data, allEmployees, employee_names, working_places});
       //res.json()
  
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