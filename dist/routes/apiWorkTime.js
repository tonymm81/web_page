"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHalndler_1 = require("../errors/errorHalndler");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const apiWorkTimeRouter = express_1.default.Router();
apiWorkTimeRouter.use(express_1.default.json());
const count_payment_and_hours = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let employee_payment = yield prisma.employer_data.findFirst({ where: { employer_work_id: ids,
        }, select: { payment: true, vat: true } });
    let employee_hour_count = yield prisma.employee_data.groupBy({
        by: ['employee_worktime_id'],
        where: { employee_worktime_id: ids },
        _sum: {
            hours_employee: true,
        },
    });
    let payment_before_taxes = Number((_a = employee_hour_count[0]) === null || _a === void 0 ? void 0 : _a._sum.hours_employee) * Number(employee_payment === null || employee_payment === void 0 ? void 0 : employee_payment.payment);
    let payment_after_taxes = (100 - Number(employee_payment === null || employee_payment === void 0 ? void 0 : employee_payment.vat)) / 100 * payment_before_taxes; // this calculate wrong
    //console.log("what kind of values",payment_after_taxes,payment_before_taxes, employee_hour_count, employee_payment, ids)                                                         
    return [payment_after_taxes, payment_before_taxes, employee_hour_count];
});
const get_employer_data_needed = () => __awaiter(void 0, void 0, void 0, function* () {
    let employee_names = yield prisma.user_data.findMany({
        where: {
            who_is_logging: "employee",
        },
        select: {
            user_id: true,
            user_name: true,
        },
    });
    let employer_data = yield prisma.employer_data.findMany();
    let allEmployees = yield prisma.employee_data.findMany();
    let working_places = yield prisma.working_ids.findMany();
    return [employer_data, allEmployees, employee_names, working_places];
}); //employer_data, allEmployees, employee_names, working_places
apiWorkTimeRouter.get("/employeedata/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //req.query.employee_worktime_id = String(1)// this will search one specific employee data
    console.log("what is the id", req.params.id);
    try {
        if (req.params.id) {
            let get_payment_information = yield count_payment_and_hours(Number(req.params.id));
            let employeework = yield prisma.employee_data.findMany({ where: { employee_worktime_id: Number(req.params.id) } });
            let employee_work_places = yield prisma.working_ids.findMany({ where: { employee_id: Number(req.params.id) } });
            console.log("where is the problem", get_payment_information, employee_work_places, employeework);
            res.json({ employeework, employee_work_places, get_payment_information });
        }
    }
    catch (e) {
        console.log("error in get route", e);
        next(new errorHalndler_1.ServerError());
    }
}));
apiWorkTimeRouter.delete("/employeedata/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // this will delete the chosen employeedata
    let search_based_user = yield prisma.employee_data.findMany({ where: { employee_id_auto: Number(req.params.id) },
        select: { employee_worktime_id: true } });
    if (yield prisma.employee_data.count({ where: { employee_id_auto: Number(req.params.id) } })) {
        try {
            yield prisma.employee_data.delete({ where: { employee_id_auto: Number(req.params.id) } });
            console.log("delete route", search_based_user);
            let employeework = yield prisma.employee_data.findMany({ where: { employee_worktime_id: Number(search_based_user[0].employee_worktime_id) } });
            let employee_work_places = yield prisma.working_ids.findMany({ where: { employee_id: Number(search_based_user[0].employee_worktime_id) } });
            let get_payment_information = yield count_payment_and_hours(Number(search_based_user[0].employee_worktime_id));
            res.json({ employeework, employee_work_places, get_payment_information });
        }
        catch (show_me_error_oh_mighty_database) {
            console.log("error db delete", show_me_error_oh_mighty_database);
            next(new errorHalndler_1.ServerError(404, "ratapase"));
        }
    }
}));
apiWorkTimeRouter.put("/employeedata/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log("put", req.body);
    if (yield prisma.employee_data.count({
        where: {
            employee_id_auto: Number(req.params.id)
        }
    })) {
        if (((_b = req.body.description) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            try {
                yield prisma.employee_data.update({
                    where: {
                        employee_id_auto: Number(req.params.id)
                    },
                    data: {
                        datetime_emp: req.body.datetime_emp,
                        hours_employee: req.body.hours_employee,
                        description: req.body.description,
                        jobID: req.body.jobID
                    }
                });
                let employee_worktime_id = yield prisma.employee_data.findFirst({ where: { employee_id_auto: Number(req.params.id),
                    }, select: {
                        employee_worktime_id: true
                    } });
                let employeework = yield prisma.employee_data.findMany({ where: { employee_worktime_id: Number(employee_worktime_id === null || employee_worktime_id === void 0 ? void 0 : employee_worktime_id.employee_worktime_id) } });
                let get_payment_information = yield count_payment_and_hours(Number(employee_worktime_id === null || employee_worktime_id === void 0 ? void 0 : employee_worktime_id.employee_worktime_id));
                let employee_work_places = yield prisma.working_ids.findMany({ where: { employee_id: Number(employee_worktime_id === null || employee_worktime_id === void 0 ? void 0 : employee_worktime_id.employee_worktime_id) } });
                res.json({ employeework, employee_work_places, get_payment_information });
            }
            catch (e) {
                next(new errorHalndler_1.ServerError());
            }
        }
        else {
            next(new errorHalndler_1.ServerError(400, "Data is faulty"));
        }
    }
    else {
        next(new errorHalndler_1.ServerError(400, "wrong id"));
    }
}));
apiWorkTimeRouter.post("/employeedata", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("are we posting employee", req.body.employee_worktime_id);
    if (req.body.description.length > 0) { // if employee makes a new worktime writing, this will add with relation the data to specific employee
        try {
            yield prisma.user_data.update({
                where: {
                    user_id: Number(req.body.employee_worktime_id),
                },
                data: {
                    //muokattuPWM : req.body.muokattuPWM,
                    employee_data: {
                        create: {
                            datetime_emp: new Date(req.body.datetime),
                            hours_employee: req.body.hours_employee,
                            description: req.body.description,
                            jobID: req.body.jobID,
                            employeeName: req.body.employee_name
                        },
                    },
                },
            });
            console.log("did it?");
            let employeework = yield prisma.employee_data.findMany({ where: { employee_worktime_id: Number(req.body.employee_worktime_id) } });
            let get_payment_information = yield count_payment_and_hours(Number(req.body.employee_worktime_id));
            let employee_work_places = yield prisma.working_ids.findMany({ where: { employee_id: Number(req.body.employee_worktime_id) } });
            res.json({ employeework, employee_work_places, get_payment_information });
        }
        catch (e) {
            console.log("db error", e);
            next(new errorHalndler_1.ServerError(400, "db error"));
        }
    }
    else {
        next(new errorHalndler_1.ServerError(400, "ServerErrorellinen pyynnön body"));
    }
}));
apiWorkTimeRouter.get("/employerdata", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("are we in get employer data", req.body); // when employer are log in, this will return all employer and employee data
    let who = "employee";
    try {
        let employerdata = yield get_employer_data_needed(); // get all employer data
        res.json({ employerdata });
        //res.json({employer_data, allEmployees, employee_names, working_places, employerdata});
    }
    catch (e) {
        console.log("are we in get employer data", e);
        next(new errorHalndler_1.ServerError(404, "not found"));
    }
}));
apiWorkTimeRouter.delete("/employerdata", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("deleting", req.query); // this is not working
    try {
        if (req.query.what_delete === "Workid_delete") { // this will delete only working places
            if (yield prisma.working_ids.count({ where: { working_id_ids: Number(req.query.working_id_ids) } })) { // delete only workplace
                yield prisma.working_ids.delete({ where: { working_id_ids: Number(req.query.working_id_ids) } });
                console.log("should we delete id:s");
            }
        }
        if (req.query.what_delete === "Delete_all") { // this will delete all data what is related to specific employee
            if (yield prisma.employer_data.count({ where: { empoyer_data_id: Number(req.query.working_id_ids) } })) { // delete all data specific employee
                let employerdata_id = yield prisma.employer_data.findFirst({ where: { employer_work_id: Number(req.query.Employee_id) }, select: { empoyer_data_id: true } });
                console.log("should we delete all data", employerdata_id); // repair this it is null
                yield prisma.employer_data.delete({ where: { empoyer_data_id: Number(employerdata_id === null || employerdata_id === void 0 ? void 0 : employerdata_id.empoyer_data_id) } }); // check
                yield prisma.employee_data.deleteMany({ where: { employee_worktime_id: Number(req.query.Employee_id) } });
                yield prisma.working_ids.deleteMany({ where: { employee_id: Number(req.query.Employee_id) } });
                yield prisma.user_data.delete({ where: { user_id: Number(req.query.Employee_id) } });
                // we need to delete user also!!!
            }
        }
        let employerdata = yield get_employer_data_needed(); // get all employer data
        res.json({ employerdata });
    }
    catch (dewleteerror) {
        console.log("are we in get employer data", dewleteerror);
        next(new errorHalndler_1.ServerError());
    }
}));
apiWorkTimeRouter.post("/employerdata", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    console.log("employer data add", req.body); // if employee make a new employee data, this will add it to database and get back all employee data to client
    if (((_c = req.body.employee_name) === null || _c === void 0 ? void 0 : _c.length) > 0) {
        try {
            console.log("employer data add", req.body);
            if (req.body.payment !== undefined) { //if new employee, lets add all details
                let employer = yield prisma.employer_data.create({
                    data: {
                        payment: Number(req.body.payment),
                        vat: Number(req.body.vat),
                        employee_name: String(req.body.employee_name),
                        employer_work_id: Number(req.body.employee_work_id)
                    }
                });
            }
            let workid = yield prisma.working_ids.create({ data: { employee_id: Number(req.body.employee_work_id),
                    employee_name: String(req.body.employee_name),
                    workplace_id: req.body.workIDS } });
            let employerdata = yield get_employer_data_needed(); // get all employer data
            res.json({ employerdata });
        }
        catch (e) {
            console.log("database error", e);
            next(new errorHalndler_1.ServerError(400, "database error"));
        }
    }
    else {
        next(new errorHalndler_1.ServerError(400, "ServerError"));
    }
}));
apiWorkTimeRouter.put("/employerdata/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = apiWorkTimeRouter;
