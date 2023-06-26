import {Response,Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// require('dotenv').config();

export interface decoded {
    userInfo:{
        user:string,
        username:string,
        userEmail:string,
        roles:number | [number] | number[]
    }
}

 
const verifyJWT= (req: Request, res:Response, next:NextFunction)=>{
    const authHeader:any = req.headers.authorization || req.headers.Authorization;
    // console.log(req.headers.authorization)
    if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({message:'Unauthorized Access'});
    const token = authHeader.split(' ')[1];
      jwt.verify(
        token,
        `${process.env.ACCESS_TOKEN_SECRET}`,
        (err:any, options:any)=>{
            if(err) return res.status(403).json({message:'Access Forbidden'});// invalid token

            req.user = options?.userInfo?.user;
            req.username = options?.userInfo?.username;
            req.email = options?.userInfo?.email;
            req.roles = options?.userInfo?.roles;
            next();
        }
    );
  
}

export default verifyJWT;


// add dependencies const express = require('express'); const jwt = require('jsonwebtoken'); // create express app const app = express(); // create middleware to verify jwt const verifyJwt = (req: express.Request, res: express.Response, next: express.NextFunction) => { // get authorization header const authorizationHeader = req.headers.authorization; // if authorization header is present if (authorizationHeader) { // extract token from authorization header const token = authorizationHeader.split(' ')[1]; // verify jwt jwt.verify(token, 'your-token-secret', (err: Error, decoded: any) => { // if token is valid if (!err) { req.user = decoded; // add token to req req.token = token; // call next middleware next(); } else { res.status(403).json({ message: 'Invalid token', }); } }); } else { res.status(401).json({ message: 'No token provided', }); } }; // add route app.get('/', verifyJwt, (req: express.Request, res: express.Response) => { // get user from req const user = req.user; // send response res.status(200).json({ success: true, user: { id: user.id, name: user.name, email: user.email, }, }); }); // start server app.listen(3000, () => { console.log('Server started on port 3000'); });