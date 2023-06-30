import express from 'express';
const router = express.Router();
import ROLES_LIST from '../../../config/roleList';
import verifyRoles from '../../Http/Middleware/verifyRoles';
import TodoController from '../../Http/Controllers/TodoController';
import useMulter from '../../utils/useMulter';
import verifyJWT from '../../Http/Middleware/verifyJWT';
const upload = useMulter('todo');
router.route('/')
    .get((req, res, next) => TodoController.list(req, res, next))
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), upload.single('upload'), (req, res, next) => TodoController.create(req, res))
    .put(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => TodoController.update(req, res))
    .delete(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => TodoController.delete(req, res));
export default router;
