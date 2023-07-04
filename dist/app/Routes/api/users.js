import express from 'express';
const router = express.Router();
import useMulter from '../../utils/useMulter.js';
import ROLES_LIST from '../../../config/roleList.js';
import verifyRoles from '../../Http/Middleware/verifyRoles.js';
import UsersController from '../../Http/Controllers/UsersController.js';
import verifyJWT from '../../Http/Middleware/verifyJWT.js';
const upload = useMulter('users');
router.route('/')
    .get(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV, ROLES_LIST.USER, ROLES_LIST.STAFF), (req, res, next) => UsersController.list(req, res))
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV, ROLES_LIST.USER, ROLES_LIST.STAFF), (req, res, next) => UsersController.create(req, res))
    .patch(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV, ROLES_LIST.USER, ROLES_LIST.STAFF), (req, res, next) => UsersController.update(req, res))
    .put(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV, ROLES_LIST.USER, ROLES_LIST.STAFF), (req, res, next) => UsersController.update(req, res))
    .delete(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV, ROLES_LIST.USER, ROLES_LIST.STAFF), (req, res, next) => UsersController.delete(req, res));
router.route('/:id')
    .get((req, res, next) => UsersController.read(req, res, next));
// .post(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
// .put(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
// .delete(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.delete(req, res))
router.route('/uploads/:uploadType')
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV, ROLES_LIST.USER, ROLES_LIST.STAFF), upload.single('avatar'), (req, res, next) => UsersController.upload(req, res))
    .put(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV, ROLES_LIST.USER, ROLES_LIST.STAFF), upload.single('avatar'), (req, res, next) => UsersController.upload(req, res));
// .delete(verifyJWT,verifyRoles(ROLES_LIST.ADMIN,ROLES_LIST.DEV, ROLES_LIST.USER,ROLES_LIST.STAFF), (req:Request, res:Response, next:NextFunction) => PostHandler.delete(req, res))
router.route('/remove-uploads')
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => UsersController.removeUploads(req, res));
export default router;
