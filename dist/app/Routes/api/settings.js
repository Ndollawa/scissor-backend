import express from 'express';
const router = express.Router();
import ROLES_LIST from '../../../config/roleList';
import verifyRoles from '../../Http/Middleware/verifyRoles';
import SettingsController from '../../Http/Controllers/SettingsController';
import verifyJWT from '../../Http/Middleware/verifyJWT';
import useMulter from '../../utils/useMulter';
const upload = useMulter('settings');
router.route('/')
    .get((req, res, next) => SettingsController.list(req, res, next))
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => SettingsController.create(req, res, next))
    .put(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => SettingsController.delete(req, res, next))
    .patch(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => SettingsController.delete(req, res, next));
router.route('/homepage-config')
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => SettingsController.updateHomepageSettings(req, res));
router.route('/general')
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => SettingsController.updateGeneralSettings(req, res));
router.route('/pages')
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => SettingsController.updatePagesSettings(req, res));
router.route('/dashboard-config')
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => SettingsController.updateDashboardSettings(req, res));
router.route('/remove-uploads')
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req, res, next) => SettingsController.removeUploads(req, res));
router.route('/uploads')
    .post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), upload.single('siteImage'), (req, res, next) => SettingsController.uploads(req, res));
export default router;
