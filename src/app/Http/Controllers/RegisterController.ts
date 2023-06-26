import  UserModel from '../../Models/User';
import  bcrypt from 'bcrypt';
import path from 'path';
// import {fileURLToPath} from 'url';
import { Request, Response } from 'express';
// require('dotenv').config()
//  const __filename = fileURLToPath(import.meta.url);

        // 
        // const __dirname = path.dirname(__filename);
class RegisterController{
   
    // handles user registration
register = async (req:Request, res:Response)=>{
    const {username, email, password} = req.body;
    if(!email || !password)return res.status(400).json({'message': 'Email and password are required!'});

    //check for duplicate emails in the DB
    const duplicate = await UserModel.findOne({email}||{username}).exec();
    if(duplicate)return res.status(409).json({message:"Sorry a User with this details already exist!"});// conflict
    try{

        //encrypt password
        const hashedPassword = await bcrypt.hash(password,10);

        // create and save new User
        const newUser = await UserModel.create({
            'email': email,
            'username' : username,
            // 'roles':{'Registeror':3},
            'password':hashedPassword});
        // userDB.

        res.status(201).json({'message':   `New user ${email} created!`});
    }catch(err:any){
        res.status(500).json({'message': err.message});
    }
}


}

export default new RegisterController();