import express,{Response,Request,NextFunction} from 'express';
const router = express.Router();
import ROLES_LIST from '../../../config/roleList.js';
import verifyRoles from '../../Http/Middleware/verifyRoles.js';
import SettingsController from '../../Http/Controllers/SettingsController.js';
import verifyJWT from '../../Http/Middleware/verifyJWT.js';
import useMulter from '../../utils/useMulter.js';


const upload = useMulter('settings')

router.route('/')
.get((req:Request, res:Response, next:NextFunction) => SettingsController.list(req, res, next))
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.create(req, res,next))
.put(verifyJWT,verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.delete(req, res,next))
.patch(verifyJWT,verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.delete(req, res,next));

router.route('/homepage-config')
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.updateHomepageSettings(req, res));

router.route('/general')
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.updateGeneralSettings(req, res));

router.route('/pages')
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.updatePagesSettings(req, res));

router.route('/dashboard-config')
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV),(req:Request, res:Response, next:NextFunction) => SettingsController.updateDashboardSettings(req, res));

router.route('/remove-uploads')
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV),(req:Request, res:Response, next:NextFunction) => SettingsController.removeUploads(req, res));

router.route('/uploads')
.post(verifyJWT,verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV),upload.single('siteImage'),(req:Request, res:Response, next:NextFunction) => SettingsController.uploads(req, res));




export default  router; 