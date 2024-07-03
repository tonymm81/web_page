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
const crypto_1 = __importDefault(require("crypto"));
const apiSignRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
apiSignRouter.use(express_1.default.json());
apiSignRouter.post("/signin", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("tuleeko signinnii", req.body);
    let crypted = crypto_1.default.createHash("SHA512").update(req.body.password).digest("hex");
    console.log(req.body, crypted);
    try {
        yield prisma.user_data.create({
            data: {
                user_name: String(req.body.userName),
                user_pwd: crypted,
                user_error: String(req.body.user_error),
                who_is_logging: String(req.body.who_is_logging)
            }
        });
        res.json({ tunnukset: true });
    }
    catch (err) {
        next(new errorHalndler_1.ServerError(401, "noouuu"));
        console.log("database error : ", err);
    }
}));
exports.default = apiSignRouter;
