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
const client_1 = require("@prisma/client");
const errorHalndler_1 = require("../errors/errorHalndler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
const apiAuthRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
apiAuthRouter.use(express_1.default.json());
apiAuthRouter.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //let hash = crypto.createHash("SHA512").update(req.body.password).digest("hex");
    try {
        const AppUser = yield prisma.user_data.findFirst({
            where: {
                user_name: req.body.userName
            }
        });
        // Jos käyttäjää ei löydy → suoraan virhe
        if (!AppUser) {
            return next(new errorHalndler_1.ServerError(401, "Wrong username or password"));
        }
        // bcrypt-vertailu vasta kun tiedetään että user_pwd on olemassa
        const isMatch = yield bcrypt_1.default.compare(req.body.password, AppUser.user_pwd);
        if (!isMatch) {
            return next(new errorHalndler_1.ServerError(401, "Wrong username or password"));
        }
        // Tässä vaiheessa kaikki ok → luodaan token
        const token = jsonwebtoken_1.default.sign({ id: AppUser.user_id, username: AppUser.user_name }, String(process.env.ACCESS_TOKEN_KEY));
        res.json({
            token,
            username: AppUser.user_name,
            who_is_logging: AppUser.who_is_logging,
            user_id: AppUser.user_id
        });
    }
    catch (_a) {
        next(new errorHalndler_1.ServerError());
    }
}));
apiAuthRouter.post("/login/getsSecondary", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    let token_from_client = req.body.Response_from_google;
    const secret = (_a = process.env.GOOGLE_CAPTCHA) !== null && _a !== void 0 ? _a : "";
    const token = token_from_client !== null && token_from_client !== void 0 ? token_from_client : "";
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);
    try {
        const response = yield axios_1.default.post("https://www.google.com/recaptcha/api/siteverify", params, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
        if (response.data.success) {
            let tokenSecondary = jsonwebtoken_1.default.sign({}, String(process.env.ACCESS_TOKEN_KEY_SECONDARY));
            res.json(tokenSecondary);
        }
        else if (!response.data.success) {
            res.status(401).json({ ok: false, google: response.data });
        }
        else {
            next(new errorHalndler_1.ServerError(401, response.data));
        }
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err)) {
            console.error('siteverify axios error', (_c = (_b = err.response) === null || _b === void 0 ? void 0 : _b.data) !== null && _c !== void 0 ? _c : err.message);
            if ((_d = err.response) === null || _d === void 0 ? void 0 : _d.data) {
                // DEBUG: palauta google‑vastaus clientille vain väliaikaisesti
                res.status(401).json({ ok: false, google: err.response.data });
                return;
            }
        }
        else {
            console.error('siteverify unknown error', err);
        }
        next(new errorHalndler_1.ServerError(401, 'unauthorized'));
    }
}));
exports.default = apiAuthRouter;
