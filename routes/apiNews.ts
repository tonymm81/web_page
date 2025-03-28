import express from 'express';
import { ServerError } from '../errors/errorHalndler';
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import { format } from 'date-fns';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '../.env' });

const prisma : PrismaClient = new PrismaClient();

const apiNewsRouter : express.Router = express.Router();

apiNewsRouter.use(express.json());

const news_api = process.env.REACT_APP_API_KEY_NEWS 

const get_time_news = () => {
    let search_time = new Date()
    search_time.setHours(search_time.getHours() + 2)
    return search_time
}

let search_time_news = get_time_news()

const get_news_everything = async (cathegory : string, search_word : string) : Promise<any> => { // get forecast
    let timefrom = new Date()
    let api_address = `https://newsapi.org/v2/${cathegory}?q=${search_word}&to=${format(timefrom, "Y-M-d")}&language=en&sortBy=popularity&apiKey=${news_api}` 
    const newsEverythingResponse = await fetch(api_address)
    const responseDataNewsEverything = await newsEverythingResponse.json()
    return responseDataNewsEverything 
}

const get_news_topnews = async (cathegory : string, Chooce_country : string) : Promise<any> => { // get location codes
    let timefrom = new Date()
    let api_address = `https://newsapi.org/v2/${cathegory}?country=${Chooce_country}&language=en&apiKey=${news_api}`
    const newsTopnewsResponse = await fetch(api_address);
    const responseDataTopnews = await newsTopnewsResponse.json();
    return responseDataTopnews
    
    
}

const check_search_time = (what_time_news : Date, searchemptynews : boolean, searchCounterNews : number)  =>{
    let search_permission = false
    search_time_news = get_time_news()
    //let checkTime = new Date()
    let diffence =  search_time_news.getTime() -what_time_news.getTime() 
    if ( diffence > 180000){//000
        search_permission = true
        search_time_news = get_time_news()
        console.log("permission gived")

    }
    if((searchemptynews)&&(searchCounterNews <= 2)){
        search_permission = true
    }
    return [search_permission, diffence]
}
apiNewsRouter.get("/newsTimerule", async (req: express.Request, res: express.Response, next: express.NextFunction) => {// this route limits user search i per 3 minutes
    let what_time = new Date(String(req.query.news_timestamp))
    let permissionTimerule = check_search_time(what_time, Boolean(req.query.searchemptynews), Number(req.query.searchCounterNews))
    console.log("forecast browser time", what_time, "rule",permissionTimerule, "server time",req.query.searchCounterNews, "times visits",req.query.searchemptynews)
    res.json({permissionTimerule});
    permissionTimerule = []
});

apiNewsRouter.get("/news", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
        //let what_time_news =  new Date(String(req.query.news_timestamp))
        let jsonlength = 0
        //let search_permission = check_search_time(what_time_news)
        
            if(Number(req.query.userchoose) === 0 ){
            var news_everything = await get_news_everything(String(req.query.cathegory), String(req.query.searchword))
                
            try{
                
                jsonlength = news_everything['articles'].length;
            }catch(errors){
                jsonlength = news_everything['articles'].length; // throws an error
                next(new ServerError(404, `Not find data for this search word from top news`))

                }
            try {
                await prisma.news_data.deleteMany({}) // this will empy the database
                let i = 0
                
                
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
                let old_search = await prisma.news_data.findMany()
                res.json([old_search]); 
        }  catch (e : any) {
            next(new ServerError(404, `Not find data for this search word from everything ${e}`))
        
        } }
        if(Number(req.query.userchoose) === 1 ){
            var news_everything = await get_news_topnews(String(req.query.cathegory), String(req.query.Chooce_country) )
           
            
            try {
                let jsonlength = news_everything['articles'].length
                await prisma.news_data.deleteMany({}) // this will empy the database
                let i = 0
                
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
                let old_search = await prisma.news_data.findMany()

                res.json([old_search]);
            
        }  catch (e : any) {
            next(new ServerError(404, `Not find data for this search word from top news ${e}`))
        
        }}
       
            
    
       
   
});
apiNewsRouter.get("/news_saved", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    try {
        //let what_time_news = get_time_news()
        //let search_permission = check_search_time(what_time_news)

        let old_search = await prisma.news_data.findMany()
        res.json([old_search]);
    } catch (e : any) {
        next(new ServerError(404, "no savd data found"));
    }

});

export default apiNewsRouter;