import {NextFunction, Request,response,Response,} from "express";
import HttpError from "../core/HttpError";
export const errorLogger=(error:HttpError,req:Request,res:Response,next:NextFunction)=>{
    console.error(error);
    next(error);
}
export const errorMiddleware=(error:HttpError,req:Request,res:Response,next:NextFunction)=>{
    const status=error.status||500;
    const message=error.message || 'Something went wrong';
    res.status(status).json({status,message});
}
