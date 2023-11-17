import express from 'express';

export class ServerError extends Error {
    status : number
    message : string
    constructor(status? : number, message? : string) {
        super();
        this.status = status || 500;
        this.message = message || "Error has occured in server";
    }

}

const errorHandler = (err : ServerError, req : express.Request, res : express.Response, next : express.NextFunction) => {

    res.status(err.status).json({errors : err.message});

    next();

}

export default errorHandler;