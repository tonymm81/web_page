import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { checkSearchTime } from "../utils/checkSearchTime";

dotenv.config();
dotenv.config({ path: '../.env' });
const prisma: PrismaClient = new PrismaClient();

const apiForecastRouter: express.Router = express.Router();

apiForecastRouter.use(express.json());

const weahter_api = process.env.REACT_APP_API_KEY



const get_forecast = async (lat: any): Promise<any> => { // get forecast
    const forecastresponse: AxiosResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat[0]}&lon=${lat[1]}&appid=${weahter_api}&units=metric`); //https://xamkbit.azurewebsites.net/saaennuste/${userchoose}
    const responseData = forecastresponse.data;    //console.log(responseData)
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


apiForecastRouter.get("/forecast", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //let what_time = new Date(String(req.query.forecast_timestamp)) //new Date()
    //Make here a time rule, what rules, if we get new data or not
    const { allowed, difference } = checkSearchTime("weather");// this is made for apicall user based search limit in version 194
    if (allowed)
        {
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
                res.json([return_forecast, difference]);

            } catch (e: any) {
                next(new ServerError(404, `Not find data for this search word ${e}`))
            }
        } else {
            next(new ServerError(404, "Not find data for this search word "))
        }
    }else{
         try {
        let return_forecast_saved = await prisma.forecast.findMany()
        console.log("trying to connect the db",return_forecast_saved)
        res.json([return_forecast_saved, difference]);
    } catch (e: any) {
        next(new ServerError(404, "not working at all"));
    }
    }
   
    
});
apiForecastRouter.get("/forecast_saved", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //let what_time = get_time()
    //let permission = check_search_time(what_time)
    try {
        let return_forecast = await prisma.forecast.findMany()
        console.log("trying to connect the db",return_forecast)
        res.json([return_forecast]);
    } catch (e: any) {
        next(new ServerError(404, "not working at all"));
    }

});

export default apiForecastRouter;