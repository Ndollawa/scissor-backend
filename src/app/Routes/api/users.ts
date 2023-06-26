import express, {Request,Response , NextFunction } from 'express';
const router = express.Router();
import useMulter from '../../utils/useMulter';
import ROLES_LIST  from '../../../config/roleList';
import verifyRoles  from '../../Http/Middleware/verifyRoles';
import UsersController from '../../Http/Controllers/UsersController';
import verifyJWT from '../../Http/Middleware/verifyJWT';


const upload = useMulter('users')


router.route('/')
.get(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV, ROLES_LIST.USER,ROLES_LIST.STAFF),(req:Request, res:Response, next:NextFunction) => UsersController.list(req,res))
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV, ROLES_LIST.USER,ROLES_LIST.STAFF),(req:Request, res:Response, next:NextFunction) => UsersController.create(req,res))
.patch(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV, ROLES_LIST.USER,ROLES_LIST.STAFF),(req:Request, res:Response, next:NextFunction) => UsersController.update(req,res))
.put(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV, ROLES_LIST.USER,ROLES_LIST.STAFF),(req:Request, res:Response, next:NextFunction) => UsersController.update(req,res))
.delete(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV, ROLES_LIST.USER,ROLES_LIST.STAFF),(req:Request, res:Response, next:NextFunction) => UsersController.delete(req,res))


router.route('/:id')
.get((req, res, next) => UsersController.read(req, res, next));
// .post(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
// .put(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
// .delete(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.delete(req, res))
router.route('/uploads/:uploadType')
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV, ROLES_LIST.USER,ROLES_LIST.STAFF),upload.single('avatar'), (req:Request, res:Response, next:NextFunction) => UsersController.upload(req, res))
.put(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV, ROLES_LIST.USER,ROLES_LIST.STAFF), upload.single('avatar'),(req:Request, res:Response, next:NextFunction) => UsersController.upload(req, res))
// .delete(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV, ROLES_LIST.USER,ROLES_LIST.STAFF), (req:Request, res:Response, next:NextFunction) => PostHandler.delete(req, res))
router.route('/remove-uploads')
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV),(req:Request, res:Response, next:NextFunction) => UsersController.removeUploads(req, res));


export default router; 

