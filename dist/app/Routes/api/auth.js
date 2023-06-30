import express from 'express';
const router = express.Router();
import AuthController from '../../Http/Controllers/AuthController';
import RegisterController from '../../Http/Controllers/RegisterController';
import loginLimiter from '../../Http/Middleware/loginLimiter';
router.route('/')
    .post(loginLimiter, (req, res, next) => AuthController.login(req, res));
router.route('/login')
    .post(loginLimiter, (req, res, next) => AuthController.login(req, res));
router.route('/logout')
    .post((req, res, next) => AuthController.logout(req, res));
router.route('/refresh')
    // .get((req:Request, res:Response,next:NextFunction)=>RegisterController.index(req,res))
    .get((req, res, next) => AuthController.refreshTokenHandler(req, res));
router.route('/register')
    // .get((req:Request, res:Response,next:NextFunction)=>RegisterController.index(req,res))
    .post((req, res, next) => RegisterController.register(req, res));
export default router;
