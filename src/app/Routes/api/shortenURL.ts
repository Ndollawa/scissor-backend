import express, {Request,Response , NextFunction } from 'express';
const router = express.Router();
import ROLES_LIST  from '../../../config/roleList';
import verifyRoles  from '../../Http/Middleware/verifyRoles';
import URLShortenerController from '../../Http/Controllers/ShortenURLController';
import verifyJWT from '../../Http/Middleware/verifyJWT';
import shortenURLLimiter from '../../Http/Middleware/shortenURLLimiter';




router.route('/')
.get((req:Request, res:Response, next:NextFunction) => URLShortenerController.list(req,res,next))
.post(shortenURLLimiter,verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV,ROLES_LIST.USER,ROLES_LIST.STAFF),(req:Request, res:Response, next:NextFunction) => URLShortenerController.create(req,res))
.patch(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV,ROLES_LIST.USER,ROLES_LIST.STAFF),(req:Request, res:Response, next:NextFunction) => URLShortenerController.update(req,res))
.put(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV,ROLES_LIST.USER,ROLES_LIST.STAFF),(req:Request, res:Response, next:NextFunction) => URLShortenerController.update(req,res))
.delete(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV,ROLES_LIST.USER,ROLES_LIST.STAFF),(req:Request, res:Response, next:NextFunction) => URLShortenerController.delete(req,res))

router.route('/click')
.patch((req:Request, res:Response, next:NextFunction) => URLShortenerController.updateClick(req,res))
.put((req:Request, res:Response, next:NextFunction) => URLShortenerController.updateClick(req,res));

router.route('/:shortURL')
.get((req:Request, res:Response, next:NextFunction) => URLShortenerController.handleRedirect(req,res));

export default router; 

