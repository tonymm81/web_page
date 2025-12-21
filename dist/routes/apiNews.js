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
const date_fns_1 = require("date-fns");
const dotenv_1 = __importDefault(require("dotenv"));
const checkSearchTime_1 = require("../utils/checkSearchTime");
dotenv_1.default.config();
dotenv_1.default.config({ path: '../.env' });
const prisma = new client_1.PrismaClient();
const apiNewsRouter = express_1.default.Router();
apiNewsRouter.use(express_1.default.json());
const news_api = process.env.REACT_APP_API_KEY_NEWS;
const get_news_everything = (cathegory, search_word) => __awaiter(void 0, void 0, void 0, function* () {
    let timefrom = new Date();
    let api_address = `https://newsapi.org/v2/${cathegory}?q=${search_word}&to=${(0, date_fns_1.format)(timefrom, "Y-M-d")}&language=en&sortBy=popularity&apiKey=${news_api}`;
    const newsEverythingResponse = yield (0, node_fetch_1.default)(api_address);
    const responseDataNewsEverything = yield newsEverythingResponse.json();
    return responseDataNewsEverything;
});
const get_news_topnews = (cathegory, Chooce_country) => __awaiter(void 0, void 0, void 0, function* () {
    let timefrom = new Date();
    let api_address = `https://newsapi.org/v2/${cathegory}?country=${Chooce_country}&language=en&apiKey=${news_api}`;
    const newsTopnewsResponse = yield (0, node_fetch_1.default)(api_address);
    const responseDataTopnews = yield newsTopnewsResponse.json();
    return responseDataTopnews;
});
apiNewsRouter.get("/news", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //let what_time_news =  new Date(String(req.query.news_timestamp))
    let jsonlength = 0;
    //let search_permission = check_search_time(what_time_news)
    const { allowed, difference } = (0, checkSearchTime_1.checkSearchTime)("news"); // this is made for apicall user based search limit in version 194
    if (allowed) {
        if (Number(req.query.userchoose) === 0) {
            var news_everything = yield get_news_everything(String(req.query.cathegory), String(req.query.searchword));
            try {
                jsonlength = news_everything['articles'].length;
            }
            catch (errors) {
                jsonlength = news_everything['articles'].length; // throws an error
                next(new errorHalndler_1.ServerError(404, `Not find data for this search word from top news`));
            }
            try {
                yield prisma.news_data.deleteMany({}); // this will empy the database
                let i = 0;
                for (i = 0; i < jsonlength;) {
                    yield prisma.news_data.create({
                        data: {
                            description: news_everything['articles'][i]['description'],
                            content: news_everything['articles'][i]['content'],
                            author: news_everything['articles'][i]['author'],
                            puplishDate: news_everything['articles'][i]['publishedAt'],
                            source: news_everything['articles'][i]['source']['name'],
                            tnewsTitle: news_everything['articles'][i]['title'],
                            url: news_everything['articles'][i]['url'],
                            ulr_image: news_everything['articles'][i]['urlToImage']
                        }
                    });
                    i = i + 1;
                }
                let old_search = yield prisma.news_data.findMany();
                res.json([old_search, difference]);
            }
            catch (e) {
                next(new errorHalndler_1.ServerError(404, `Not find data for this search word from everything ${e}`));
            }
        }
        if (Number(req.query.userchoose) === 1) {
            var news_everything = yield get_news_topnews(String(req.query.cathegory), String(req.query.Chooce_country));
            try {
                let jsonlength = news_everything['articles'].length;
                yield prisma.news_data.deleteMany({}); // this will empy the database
                let i = 0;
                for (i = 0; i < jsonlength;) {
                    yield prisma.news_data.create({
                        data: {
                            author: news_everything['articles'][i]['author'],
                            puplishDate: news_everything['articles'][i]['publishedAt'],
                            source: news_everything['articles'][i]['source']['name'],
                            tnewsTitle: news_everything['articles'][i]['title'],
                            url: news_everything['articles'][i]['url'],
                        }
                    });
                    i = i + 1;
                }
                let old_search = yield prisma.news_data.findMany();
                res.json([old_search, difference]);
            }
            catch (e) {
                next(new errorHalndler_1.ServerError(404, `Not find data for this search word from top news ${e}`));
            }
        }
    }
    else {
        try {
            let old_search_timeruleBlock = yield prisma.news_data.findMany();
            res.json([old_search_timeruleBlock, difference]);
        }
        catch (e) {
            next(new errorHalndler_1.ServerError(404, "no savd data found"));
        }
    }
}));
apiNewsRouter.get("/news_saved", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let old_search_from_database = yield prisma.news_data.findMany();
        res.json([old_search_from_database]);
    }
    catch (e) {
        next(new errorHalndler_1.ServerError(404, "no savd data found"));
    }
}));
exports.default = apiNewsRouter;
