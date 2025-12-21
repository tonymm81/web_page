"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const adapter_mysql_1 = require("@prisma/adapter-mysql");
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    uri: process.env.DATABASE_URL
});
const adapter = new adapter_mysql_1.PrismaMysql(pool);
exports.prisma = new client_1.PrismaClient({ adapter });
