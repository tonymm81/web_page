import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import axios, { AxiosResponse } from 'axios';
import { JsonArray } from '@prisma/client/runtime/library';
import { format, differenceInDays } from 'date-fns';

const prisma : PrismaClient = new PrismaClient();

const apiNewsRouter : express.Router = express.Router();

apiNewsRouter.use(express.json());

const news_api = process.env.REACT_APP_API_KEY_NEWS 

const get_news_everything = async (cathegory : string, search_word : string) : Promise<any> => { // get forecast
    let timefrom = new Date()
    let api_address = `https://newsapi.org/v2/${cathegory}?q=${search_word}&to=${format(timefrom, "Y-M-d")}&language=en&sortBy=popularity&apiKey=${news_api}` 
    const newsEverythingResponse = await fetch(api_address)
    const responseDataNewsEverything = await newsEverythingResponse.json()
    console.log("forecast",  cathegory, search_word)
    return responseDataNewsEverything 
}

const get_news_topnews = async (cathegory : string, Chooce_country : string) : Promise<any> => { // get location codes
    let timefrom = new Date()
    let api_address = `https://newsapi.org/v2/${cathegory}?country=${Chooce_country}&language=en&apiKey=${news_api}`
    const newsTopnewsResponse = await fetch(api_address);
    const responseDataTopnews = await newsTopnewsResponse.json();
    console.log(responseDataTopnews, cathegory, Chooce_country)
    return responseDataTopnews
    
    
}

const save_news_topnews = async (cathegory : string, Chooce_country : string) : Promise<any> => {
    
}


apiNewsRouter.get("/news", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
        console.log("kaydaanko uutisis")
        let jsonlength = 0
        if(Number(req.query.userchoose) === 0 ){
            var news_everything = await get_news_everything(String(req.query.cathegory), String(req.query.searchword))
                
            try{
                jsonlength = news_everything['articles'].length;
                console.log("length", jsonlength)
            }catch(errors){
                console.log("noou",errors, news_everything['articles'].length)
                jsonlength = news_everything['articles'].length;
                }
            try {
                await prisma.news_data.deleteMany({}) // this will empy the database
                let i = 0
                console.log(news_everything['articles'].length)
                
                
                for (i = 0; i < jsonlength;){
                    await prisma.news_data.create({
                        data: {
                            description : news_everything['articles'][i]['description'],
                            content : news_everything['articles'][i]['content'],
                            author : news_everything['articles'][i]['author'],
                            puplishDate : news_everything['articles'][i]['publishedAt'],
                            source : news_everything['articles'][i]['source']['name'],
                            tnewsTitle : news_everything['articles'][i]['title'],
                            url : news_everything['articles'][i]['url'],
                            ulr_image : news_everything['articles'][i]['urlToImage']
                            
                        }
                    })
                    i = i +1
                }
                res.json(await prisma.news_data.findMany()); 
        }  catch (e : any) {
            next(new ServerError(400, `Not find data for this search word from everything ${e}`))
        
        } }
        if(Number(req.query.userchoose) === 1 ){
            var news_everything = await get_news_topnews(String(req.query.cathegory), String(req.query.Chooce_country) )
            let jsonlength = news_everything['articles'].length
            
            try {
                await prisma.news_data.deleteMany({}) // this will empy the database
                let i = 0
                
                console.log(news_everything['articles'].length)
                for (i = 0; i < jsonlength;){
                    await prisma.news_data.create({
                        data: {
                            
                            author : news_everything['articles'][i]['author'],
                            puplishDate : news_everything['articles'][i]['publishedAt'],
                            source : news_everything['articles'][i]['source']['name'],
                            tnewsTitle : news_everything['articles'][i]['title'],
                            url : news_everything['articles'][i]['url'],
                           
                            
                            
                        }
                    })
                    i = i +1
                }
                res.json(await prisma.news_data.findMany());
        }  catch (e : any) {
            next(new ServerError(400, `Not find data for this search word from top news ${e}`))
        
        }}
        //}if(!news_everything){
          //  next(new ServerError(400, "Not find data for this search word "))
           // console.log("else")
        //}
        //Make here a time rule, what rules, if we get new data or not
        //console.log(news_everything["articles"]
            //res.json(news_everything)
            
    
       
   
});
apiNewsRouter.get("/news_saved", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log("saved news")
    try {
        res.json(await prisma.news_data.findMany());
    } catch (e : any) {
        next(new ServerError());
    }

});

export default apiNewsRouter;