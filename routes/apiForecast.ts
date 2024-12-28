import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import axios, { AxiosResponse } from 'axios';
import { JsonArray } from '@prisma/client/runtime/library';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '../.env' });
const prisma: PrismaClient = new PrismaClient();

const apiForecastRouter: express.Router = express.Router();

apiForecastRouter.use(express.json());

const weahter_api = process.env.REACT_APP_API_KEY

const get_time = () => {
    let search_time = new Date()
    search_time.setHours(search_time.getHours() + 2)
    //console.log("server time func", search_time)
    return search_time
}

let search_time = get_time()

const get_forecast = async (lat: any): Promise<any> => { // get forecast
    const forecastresponse: AxiosResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat[0]}&lon=${lat[1]}&appid=${weahter_api}&units=metric`); //https://xamkbit.azurewebsites.net/saaennuste/${userchoose}
    const responseData: JsonArray = forecastresponse.data;
    //console.log(responseData)
    return responseData
}

const get_location = async (city_name: string, country_code: string): Promise<any> => { // get location codes
    const locationresponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=${5}&appid=${weahter_api}`);
    const responseDataLocation = await locationresponse.json();
    //console.log(responseDataLocation, weahter_api)
    if (responseDataLocation) {

       let latitude = responseDataLocation[0].lat
       let lonngitude = responseDataLocation[0].lon
       return [latitude, lonngitude]
    }

}
let visits = 0
const check_search_time = (what_time: Date | any, searchemptyClient: boolean, searchCounter : number ) => {
    let search_permission = false
    visits = visits +1
    search_time = get_time()
    let diffence = search_time.getTime() - what_time.getTime() 
    console.log("how this calculates this", diffence)
    if (diffence > 180000) {//180000
        
        search_permission = true
        search_time = get_time()
        console.log("time rule true", search_permission)

    } if((searchemptyClient)&&(searchCounter <= 2)){
        search_permission = true
    }
    return [search_permission, diffence]
}

apiForecastRouter.get("/forecastTimerule", async (req: express.Request, res: express.Response, next: express.NextFunction) => {// this route limits user search i per 3 minutes
    let what_time = new Date(String(req.query.forecast_timestamp))
    let permissionTimerule = check_search_time(what_time, Boolean(req.query.searchemptyClient), Number(req.query.searchCounter))
    console.log("forecast browser time", what_time, "rule",permissionTimerule, "server time",search_time, "times visits", visits)
    res.json({permissionTimerule});
    permissionTimerule = []
});


apiForecastRouter.get("/forecast", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //let what_time = new Date(String(req.query.forecast_timestamp)) //new Date()
    //Make here a time rule, what rules, if we get new data or not
        if (String(req.query.city_name).length > 0) {

            try {
                await prisma.forecast.deleteMany({}) // this will empy the database
                //var forecastSaved : Forecast_needed[] = []
                var callLocation = await get_location(String(req.query.city_name), String(req.query.country_code))
                var callForecast = await get_forecast(callLocation)
                //let TempSaveValue : Forecast_needed[] = [...forecastSaved]
                let i = 0
                let listLenght = callForecast['list'].length
                for (i = 0; i < listLenght;) {

                    await prisma.forecast.create({
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
                    })
                    i = i + 1
                }

                let return_forecast = await prisma.forecast.findMany()
                res.json([return_forecast]);

            } catch (e: any) {
                next(new ServerError(404, `Not find data for this search word ${e}`))
            }
        } else {
            next(new ServerError(404, "Not find data for this search word "))
        }
    
   
    
});
apiForecastRouter.get("/forecast_saved", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //let what_time = get_time()
    //let permission = check_search_time(what_time)
    try {
        let return_forecast = await prisma.forecast.findMany()
        res.json([return_forecast]);
    } catch (e: any) {
        next(new ServerError(404, "not working at all"));
    }

});

export default apiForecastRouter;