import  express,{Response,Request,NextFunction} from 'express';
const router = express.Router();
import path from 'path';
import checkDuplicate from '../../Http/Controllers/DuplicateController';

router.route('/')
.post((req:Request, res:Response,next:NextFunction)=>checkDuplicate(req,res))

export default router;  