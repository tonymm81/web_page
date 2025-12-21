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
const node_fetch_1 = __importDefault(require("node-fetch"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const checkSearchTime_1 = require("../utils/checkSearchTime");
dotenv_1.default.config();
dotenv_1.default.config({ path: '../.env' });
const prisma = new client_1.PrismaClient();
const apiForecastRouter = express_1.default.Router();
apiForecastRouter.use(express_1.default.json());
const weahter_api = process.env.REACT_APP_API_KEY;
const get_forecast = (lat) => __awaiter(void 0, void 0, void 0, function* () {
    const forecastresponse = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat[0]}&lon=${lat[1]}&appid=${weahter_api}&units=metric`); //https://xamkbit.azurewebsites.net/saaennuste/${userchoose}
    const responseData = forecastresponse.data; //console.log(responseData)
    return responseData;
});
const get_location = (city_name, country_code) => __awaiter(void 0, void 0, void 0, function* () {
    const locationresponse = yield (0, node_fetch_1.default)(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=${5}&appid=${weahter_api}`);
    const responseDataLocation = yield locationresponse.json();
    //console.log(responseDataLocation, weahter_api)
    if (responseDataLocation) {
        let latitude = responseDataLocation[0].lat;
        let lonngitude = responseDataLocation[0].lon;
        return [latitude, lonngitude];
    }
});
apiForecastRouter.get("/forecast", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //let what_time = new Date(String(req.query.forecast_timestamp)) //new Date()
    //Make here a time rule, what rules, if we get new data or not
    const { allowed, difference } = (0, checkSearchTime_1.checkSearchTime)("weather"); // this is made for apicall user based search limit in version 194
    if (allowed) {
        if (String(req.query.city_name).length > 0) {
            try {
                yield prisma.forecast.deleteMany({}); // this will empy the database
                //var forecastSaved : Forecast_needed[] = []
                var callLocation = yield get_location(String(req.query.city_name), String(req.query.country_code));
                var callForecast = yield get_forecast(callLocation);
                //let TempSaveValue : Forecast_needed[] = [...forecastSaved]
                let i = 0;
                let listLenght = callForecast['list'].length;
                for (i = 0; i < listLenght;) {
                    yield prisma.forecast.create({
                        data: {
                            temp_min: callForecast['list'][i]['main']['temp_min'],
                            temp_max: callForecast['list'][i]['main']['temp_max'],
                            wind: callForecast['list'][i]['wind']['speed'],
                            timestamp: new Date(callForecast['list'][i]['dt_txt']),
                            icon: callForecast['list'][i]['weather'][0]['icon'],
                            shorDescription: callForecast['list'][i]['weather'][0]['main'],
                            visibility: callForecast['list'][i]['visibility'],
                            town_or_city: String(req.query.city_name)
                        }
                    });
                    i = i + 1;
                }
                let return_forecast = yield prisma.forecast.findMany();
                res.json([return_forecast, difference]);
            }
            catch (e) {
                next(new errorHalndler_1.ServerError(404, `Not find data for this search word ${e}`));
            }
        }
        else {
            next(new errorHalndler_1.ServerError(404, "Not find data for this search word "));
        }
    }
    else {
        try {
            let return_forecast_saved = yield prisma.forecast.findMany();
            console.log("trying to connect the db", return_forecast_saved);
            res.json([return_forecast_saved, difference]);
        }
        catch (e) {
            next(new errorHalndler_1.ServerError(404, "not working at all"));
        }
    }
}));
apiForecastRouter.get("/forecast_saved", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //let what_time = get_time()
    //let permission = check_search_time(what_time)
    try {
        let return_forecast = yield prisma.forecast.findMany();
        console.log("trying to connect the db", return_forecast);
        res.json([return_forecast]);
    }
    catch (e) {
        next(new errorHalndler_1.ServerError(404, "not working at all"));
    }
}));
exports.default = apiForecastRouter;
