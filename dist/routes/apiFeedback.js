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
const apiFeedbackRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
apiFeedbackRouter.use(express_1.default.json());
apiFeedbackRouter.post("/saveFeedback", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.feedback.create({
            data: {
                feedbackName: String(req.body.feedbackName),
                feedback: String(req.body.feedback),
                timeFeedback: req.body.timeFeedback,
                feedbackRate: Number(req.body.feedbackRate)
            }
        });
        res.json({ tunnukset: true });
    }
    catch (_a) {
        next(new errorHalndler_1.ServerError());
    }
}));
exports.default = apiFeedbackRouter;
