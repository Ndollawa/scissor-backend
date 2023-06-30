import express, {Request,Response , NextFunction } from 'express';
const router = express.Router();
import path  from 'path';
import ROLES_LIST  from '../../../config/roleList.js';
import verifyRoles  from '../../Http/Middleware/verifyRoles.js';
import TodoController from '../../Http/Controllers/TodoController.js';
import useMulter from '../../utils/useMulter.js';
import verifyJWT from '../../Http/Middleware/verifyJWT.js';

const upload = useMulter('todo')



router.route('/')
.get((req:Request, res:Response, next:NextFunction) => TodoController.list(req,res,next))
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV),upload.single('upload'),(req:Request, res:Response, next:NextFunction) => TodoController.create(req,res))
.put(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV),(req:Request, res:Response, next:NextFunction) => TodoController.update(req,res))
.delete(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV),(req:Request, res:Response, next:NextFunction) => TodoController.delete(req,res))
export default router; 

