import express, {Request,Response , NextFunction } from 'express';
const router = express.Router();
import path  from 'path';
import ROLES_LIST  from '../../../config/roleList';
import verifyRoles  from '../../Http/Middleware/verifyRoles';
import NoteController from '../../Http/Controllers/TodoController';
import useMulter from '../../utils/useMulter';
// import verifyJWT from '../../Http/Middleware/verifyJWT';

const upload = useMulter('note')



router.route('/')
.get(verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV,ROLES_LIST.USER,ROLES_LIST.STAFF),(req:Request, res:Response, next:NextFunction) => NoteController.list(req,res,next))
.post(verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV),upload.single('noteImage'),(req:Request, res:Response, next:NextFunction) => NoteController.create(req,res))
.put(verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV),(req:Request, res:Response, next:NextFunction) => NoteController.update(req,res))
.delete(verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV),(req:Request, res:Response, next:NextFunction) => NoteController.delete(req,res))
export default router; 

