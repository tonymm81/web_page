import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import axios, { AxiosResponse } from 'axios';
import { JsonArray } from '@prisma/client/runtime/library';

const prisma : PrismaClient = new PrismaClient();

const apiForecastRouter : express.Router = express.Router();

apiForecastRouter.use(express.json());

const weahter_api = process.env.REACT_APP_API_KEY
    

const get_forecast = async (lat:any) : Promise<any> => { // get forecast
    const forecastresponse: AxiosResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat[0]}&lon=${lat[1]}&appid=${weahter_api}&units=metric`); //https://xamkbit.azurewebsites.net/saaennuste/${userchoose}
    const responseData: JsonArray = forecastresponse.data;
    console.log("forecast", responseData)
    return responseData
}

const get_location = async (city_name : string, country_code : string) : Promise<any> => { // get location codes
    const locationresponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=${5}&appid=${weahter_api}`);
    const responseDataLocation = await locationresponse.json();
    if (responseDataLocation ){
       
        let latitude = responseDataLocation[0].lat
        let lonngitude  =  responseDataLocation[0].lon
       //console.log("location", responseDataLocation)
       return [latitude, lonngitude]
    }
    //console.log("location", responseDataLocation)
    
}



apiForecastRouter.get("/forecast", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
        console.log("kaydaanko")
        
        //Make here a time rule, what rules, if we get new data or not
        if (String(req.query.city_name).length > 0){

        try {
            await prisma.forecast.deleteMany({}) // this will empy the database
            //var forecastSaved : Forecast_needed[] = []
            var callLocation = await get_location(String(req.query.city_name), String(req.query.country_code))
            var callForecast = await get_forecast(callLocation)
            //let TempSaveValue : Forecast_needed[] = [...forecastSaved]
            let i = 0
            let listLenght = callForecast['list'].length
            for (i = 0; i < listLenght;){
                
                await prisma.forecast.create({
                    data: {
                            temp_min : callForecast['list'][i]['main']['temp_min'],
                            temp_max : callForecast['list'][i]['main']['temp_max'],
                            wind: callForecast['list'][i]['wind']['speed'],
                            timestamp : new Date(callForecast['list'][i]['dt_txt']),
                            icon : callForecast['list'][i]['weather'][0]['icon'],
                            shorDescription : callForecast['list'][i]['weather'][0]['main'],
                            visibility : callForecast['list'][i]['visibility'],
                            town_or_city : String(req.query.city_name)
                         }
                        })
                i = i+1
            }
            

            res.json(await prisma.forecast.findMany());
    
        } catch (e : any) {
            next(new ServerError(400, `Not find data for this search word ${e}`))
        }
    }else{
        next(new ServerError(400, "Not find data for this search word "))
    }
   
});
apiForecastRouter.get("/forecast_saved", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {
        res.json(await prisma.forecast.findMany());
    } catch (e : any) {
        next(new ServerError());
    }

});

export default apiForecastRouter;