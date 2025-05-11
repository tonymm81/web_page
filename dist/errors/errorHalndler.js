"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor(status, message) {
        super();
        this.status = status || 500;
        this.message = message || "Error has occured in server";
    }
}
exports.ServerError = ServerError;
const errorHandler = (err, req, res, next) => {
    res.status(err.status).json({ errors: err.message });
    next();
};
exports.default = errorHandler;
