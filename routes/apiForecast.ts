import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';
//import fetch from 'node-fetch';
import axios, { AxiosResponse } from 'axios';
import { JsonArray } from '@prisma/client/runtime/library';

const prisma : PrismaClient = new PrismaClient();

const apiKommenttiRouter : express.Router = express.Router();

apiKommenttiRouter.use(express.json());

const weahter_api = process.env.REACT_APP_API_KEY
    

const lat : JsonArray =[]
const lon : JsonArray = []

const get_forecast = async () : Promise<any> => {
    const forecastresponse: AxiosResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weahter_api}&units=metric`); //https://xamkbit.azurewebsites.net/saaennuste/${userchoose}
    const responseData: JsonArray = forecastresponse.data;

    return responseData
}

const get_location = async (city_name : string, country_code : string) : Promise<any> => {
    const locationresponse: AxiosResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=${5}&appid=${weahter_api}`)
    const responseDataLocation: JsonArray = locationresponse.data;
    //let lat = responseDataLocation?[0]['lat']
    //let lon = responseDataLocation?[0]['lon']
    
}



apiKommenttiRouter.get("/forecast", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
   
        if (req.body.forecast.length > 0){

        try {
            var callLocation = await get_location(req.body.city_name, req.body.country_code)
            var callForecast = await get_forecast()

          
    
            res.json({luotu: true});
    
        } catch (e : any) {
            next(new ServerError(400, "puutteelliset tiedot"))
        }
    }else{
        next(new ServerError(400, "puutteelliset tiedot"))
    }
   
});



export default apiKommenttiRouter;