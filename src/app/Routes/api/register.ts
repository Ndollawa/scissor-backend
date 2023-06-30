import  express,{Response,Request,NextFunction} from 'express';
const router = express.Router();
import path from 'path';
import RegisterController  from '../../Http/Controllers/RegisterController.js';

router.route('/')
// .get((req:Request, res:Response,next:NextFunction)=>RegisterController.index)
.post((req:Request, res:Response,next:NextFunction)=>RegisterController.register)

export default router;  