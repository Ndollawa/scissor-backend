import dotenv from 'dotenv';
import express from "express";
// import fileUpload from 'express-fileupload';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';
import { logger } from './app/Http/Middleware/logEvents.js';
import errorHandler from './app/Http/Middleware/errorHandler.js';
import corsOptions from './config/corsOptions.js';
import verifyJWT from './app/Http/Middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import credentials from './app/Http/Middleware/credentials.js';
import mongoose from 'mongoose';
import connectDB from './config/dbConn.js';
import SettingsRoutes from './app/Routes/api/settings.js';
import UserRoutes from './app/Routes/api/users.js';
import URLRoutes from './app/Routes/api/shortenURL.js';
import AuthRoutes from './app/Routes/api/auth.js';
// import  PostModel from './src/app/Models/Post';
import CheckDuplicateRoutes from './app/Http/Controllers/DuplicateController.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
// connect to Database
connectDB();
const app = express();
const PORT = process.env.PORT || 3500;
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
app.use(express.urlencoded({ extended: true }));
// built-in middleware for json
app.use(express.json());
//middleware for cookies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/public/uploads')));
///routes
app.use('/checkduplicate', CheckDuplicateRoutes);
app.use('/auth', AuthRoutes);
app.use('/settings', SettingsRoutes);
app.use('/shorten-url', URLRoutes);
// //post routes
// app.use('/post', PostRoutes);
//user routes
app.use(verifyJWT);
app.use('/users', UserRoutes);
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Resource not Found!' });
});
// custom middleware for handling errors
app.use(errorHandler);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    // Seed();
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
});
