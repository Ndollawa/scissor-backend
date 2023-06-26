  import { logEvents } from './logEvents';
import {Response,Request, NextFunction } from 'express';

const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) =>{
logEvents(`${err.name}: ${err.messsage}`, 'errLog.txt');
console.error(err.stack)
res.status(500).send(err.message);

}

export default errorHandler;
