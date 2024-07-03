"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const apiNews_1 = __importDefault(require("./routes/apiNews"));
const apiAuth_1 = __importDefault(require("./routes/apiAuth"));
const apiSign_1 = __importDefault(require("./routes/apiSign"));
const errorHalndler_1 = __importDefault(require("./errors/errorHalndler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const apiForecast_1 = __importDefault(require("./routes/apiForecast"));
const apiWorkTime_1 = __importDefault(require("./routes/apiWorkTime"));
//import fetch, { Headers } from 'node-fetch';
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT); // muista laittaa proxyyn
const checkToken = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        res.locals.username = jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_TOKEN_KEY));
        next();
    }
    catch (e) {
        res.status(401).json({});
    }
};
const checkTokenSecondary = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_TOKEN_KEY_SECONDARY));
        next();
    }
    catch (e) {
        console.log("error", e);
        res.status(401).json({});
    }
};
app.use(express_1.default.static(path_1.default.resolve(__dirname, "public")));
app.use("/api/auth", apiAuth_1.default);
app.use("/api/signin", apiSign_1.default);
app.use("/api/news", checkTokenSecondary, apiNews_1.default);
app.use("/api/forecast", checkTokenSecondary, apiForecast_1.default);
app.use("/api/WorkTime", checkToken, apiWorkTime_1.default);
app.use(errorHalndler_1.default);
app.use((req, res, next) => {
    if (!res.headersSent) {
        res.status(404).json({ viesti: "wrong route" });
    }
    next();
});
app.listen(port, () => {
    console.log(`server has started on port : ${port}`);
});
