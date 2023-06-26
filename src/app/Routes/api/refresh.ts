  import express,{Response,Request,NextFunction} from 'express';
const router = express.Router();
// import path  from 'path';
// import ROLES_LIST  from '../../config/roleList';
// import verifyRoles  from '../../middleware/verifyRoles';
import AuthController from '../../Http/Controllers/AuthController';




router.route('/')
.get((req:Request, res:Response, next:NextFunction) => AuthController.refreshTokenHandler)
export default router;