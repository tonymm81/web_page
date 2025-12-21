"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSearchTime = void 0;
const rateLimitStore_1 = require("./rateLimitStore"); // this is made for apicall user based search limit in version 194
const checkSearchTime = (key) => {
    const current = new Date();
    const last = rateLimitStore_1.lastFetchTimes[key];
    if (!last) {
        rateLimitStore_1.lastFetchTimes[key] = current;
        return { allowed: true, difference: 0 };
    }
    const difference = current.getTime() - last.getTime();
    if (difference > 180000) {
        rateLimitStore_1.lastFetchTimes[key] = current;
        return { allowed: true, difference };
    }
    return { allowed: false, difference };
};
exports.checkSearchTime = checkSearchTime;
