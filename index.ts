import express from 'express';
import path from 'path';
import apiNewsRouter from './routes/apiNews';
import apiAuthRouter from './routes/apiAuth';
import apiSignRouter from './routes/apiSign'
import serverErrorHandler from './errors/errorHalndler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import apiForecastRouter from './routes/apiForecast';
import apiWorkTimeRouter from './routes/apiWorkTime';
//import fetch, { Headers } from 'node-fetch';

dotenv.config();

const app : express.Application = express();

const port : number = Number(process.env.PORT);// muista laittaa proxyyn

const checkToken = (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {

        let token : string = req.headers.authorization!.split(" ")[1];

        res.locals.username = jwt.verify(token, String(process.env.ACCESS_TOKEN_KEY));

        next();

    } catch (e: any) {
        res.status(401).json({});
    }

}

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api/auth", apiAuthRouter);

app.use("/api/signin", apiSignRouter);

app.use("/api/news", apiNewsRouter);

app.use("/api/forecast", apiForecastRouter);

app.use("/api/WorkTime", checkToken, apiWorkTimeRouter);

app.use(serverErrorHandler);

app.use((req : express.Request, res : express.Response, next : express.NextFunction) => {

    if (!res.headersSent) {
        res.status(404).json({ viesti : "Virheellinen reitti"});
    }

    next();
});

app.listen(port, () => {

    console.log(`Palvelin käynnistyi porttiin : ${port}`);    

});