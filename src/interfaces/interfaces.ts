import { Request,Response } from "express"

export  interface MRequest extends Request{
        roles:number[],
        path:string,
        origin:string,
        user:string,
        userEmail:string,
        password:string,
        username:string

    }
export  interface MResponse extends Response{
        roles:number[],
        path:string,
        origin:string,
        user:string,
        userEmail:string,
        password:string,
        username:string


    }
