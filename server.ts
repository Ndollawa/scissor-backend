import dotenv from 'dotenv';
import express, { Application } from "express";
// import fileUpload from 'express-fileupload';
import path from 'path';
import cors from 'cors';
import  'express-async-errors';
import { logger } from './src/app/Http/Middleware/logEvents';
import errorHandler from './src/app/Http/Middleware/errorHandler';
import corsOptions from './src/config/corsOptions';
import verifyJWT from './src/app/Http/Middleware/verifyJWT';
import cookieParser from 'cookie-parser';
import credentials from './src/app/Http/Middleware/credentials';
import mongoose from 'mongoose';
import connectDB from './src/config/dbConn';
import SettingsRoutes from './src/app/Routes/api/settings';
import UserRoutes from './src/app/Routes/api/users';
import URLRoutes from './src/app/Routes/api/shortenURL';
import UserModel from './src/app/Models/User';
import AuthRoutes from './src/app/Routes/api/auth';
// import  PostModel from './src/app/Models/Post';
import CheckDuplicateRoutes from './src/app/Http/Controllers/DuplicateController';
import { Seed } from './src/app/Seeders/Seeder';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


dotenv.config(); 

// connect to Database
connectDB();

const app:Application = express();
const PORT:string |number | undefined = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

//Handle file uploads
// app.use(fileUpload({ createParentPath: true }));

//Handle credentials check before cors
app.use(credentials);


//Cross origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencodedn data
//in other words, form data
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/public/uploads')));
///routes
  
app.use('/checkduplicate', CheckDuplicateRoutes);
app.use('/auth',AuthRoutes);
app.use('/settings', SettingsRoutes);
app.use('/shorten-url', URLRoutes);

// //post routes
// app.use('/post', PostRoutes);


//user routes

app.use(verifyJWT);
app.use('/users', UserRoutes);
app.all('*',(req,res)=>{
    res.status(404).json({message: 'Resource not Found!'});
});

// custom middleware for handling errors
app.use(errorHandler);

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    // Seed();
    app.listen(PORT, ()=>console.log(`Server running on Port ${PORT}`));

});
