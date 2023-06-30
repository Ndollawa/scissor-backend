import  UserModel from '../../Models/User.js';
import { Request, Response } from 'express';
// import {fileURLToPath} from 'url';
// require('dotenv').config()
//  const __filename = fileURLToPath(import.meta.url);

        // 
        // const __dirname = path.dirname(__filename);

const checkDuplicate = async (req:Request, res:Response)=>{
    const {data:{user}} = req.body;
//  console.log(user)
    //check for duplicate username in the DB
    try{
        const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const userType = EMAIL_REGEX.test(user);
        // console.log(userType)
        let foundUser;
    if(userType){
    foundUser = await UserModel.findOne({email:user}).exec();
    }else{
    foundUser = await UserModel.findOne({username:user}).exec();
    }
        // console.log(foundUser)
            if(foundUser){return res.status(200).json({'message':  "taken"});// conflict
        }else{
            return res.status(200).json({'message':  "available"})
        }
    }catch(err){
      return res.status(500).json({'error':  err})  
    }
    
  
}




export default checkDuplicate;