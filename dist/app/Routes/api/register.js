import express from 'express';
const router = express.Router();
import RegisterController from '../../Http/Controllers/RegisterController';
router.route('/')
    // .get((req:Request, res:Response,next:NextFunction)=>RegisterController.index)
    .post((req, res, next) => RegisterController.register);
export default router;
