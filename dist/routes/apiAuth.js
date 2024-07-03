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
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = __importDefault(require("axios"));
const apiAuthRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
apiAuthRouter.use(express_1.default.json());
apiAuthRouter.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let hash = crypto_1.default.createHash("SHA512").update(req.body.password).digest("hex");
    try {
        const AppUser = yield prisma.user_data.findFirst({
            where: {
                user_name: req.body.userName
            }
        });
        if (req.body.userName === (AppUser === null || AppUser === void 0 ? void 0 : AppUser.user_name)) {
            let hash = crypto_1.default.createHash("SHA512").update(req.body.password).digest("hex");
            if (hash === (AppUser === null || AppUser === void 0 ? void 0 : AppUser.user_pwd)) {
                let token = jsonwebtoken_1.default.sign({ id: AppUser.user_id, username: AppUser.user_name }, String(process.env.ACCESS_TOKEN_KEY));
                res.json({ token: token, username: AppUser.user_name, who_is_logging: AppUser.who_is_logging, user_id: AppUser.user_id });
            }
            else {
                next(new errorHalndler_1.ServerError(401, "Wrong username or password"));
            }
        }
        else {
            next(new errorHalndler_1.ServerError(401, "Wrong username or password"));
        }
    }
    catch (_a) {
        next(new errorHalndler_1.ServerError());
    }
}));
apiAuthRouter.post("/login/getsSecondary", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token_from_client = req.body.Response_from_google;
    try {
        const response = yield axios_1.default.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_CAPTCHA}&response=${token_from_client}`);
        if (response.data.success) {
            let tokenSecondary = jsonwebtoken_1.default.sign({}, String(process.env.ACCESS_TOKEN_KEY_SECONDARY));
            res.json(tokenSecondary);
        }
        else {
            next(new errorHalndler_1.ServerError(401, "unauthorized"));
        }
    }
    catch (_b) {
        next(new errorHalndler_1.ServerError(401, "unauthorized"));
    }
}));
exports.default = apiAuthRouter;
