import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';
//import fetch from 'node-fetch';

const prisma : PrismaClient = new PrismaClient();

const apiKommenttiRouter : express.Router = express.Router();

apiKommenttiRouter.use(express.json());

const weahter_api = process.env.REACT_APP_API_KEY
    

const lat = ""
const lon = ""

const get_forecast = async () : Promise<any> => {
    //const connectionFC = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weahter_api}&units=metric`); //https://xamkbit.azurewebsites.net/saaennuste/${userchoose}
    //const apidataFC = await connectionFC.json();

    return ""
}

const get_location = async (city_name : string, country_code : string) : Promise<any> => {
    //const returndata = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=${5}&appid=${weahter_api}`)
   // const locationinfo = await returndata.json()
    //lat = locationinfo[0]['lat']
    //lon.current = locationinfo[0]['lon']
    return ""
}



apiKommenttiRouter.get("/forecast", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
   
        if (req.body.kommentti.length > 0){
        try {

          
    
            res.json({luotu: true});
    
        } catch (e : any) {
            next(new ServerError(400, "puutteelliset tiedot"))
        }
    }else{
        next(new ServerError(400, "puutteelliset tiedot"))
    }
   
});



export default apiKommenttiRouter;