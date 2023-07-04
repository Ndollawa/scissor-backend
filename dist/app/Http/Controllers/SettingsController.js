import SettingsModel from '../../Models/Setting.js';
import deleteItem from '../../utils/deleteItem.js';
import BaseController from './BaseController.js';
class SettingsController extends BaseController {
    constructor() {
        super(SettingsModel);
    }
    updateHomepageSettings = async (req, res) => {
        const { _id, data } = req.body;
        //    console.log(data)
        const result = await SettingsModel.findOneAndUpdate({ _id }, { landingPageConfig: { ...data } });
        res.status(200).json({ message: 'success' });
    };
    updateDashboardSettings = async (req, res) => {
        const { _id, data } = req.body;
        console.log(req.body);
        const result = await SettingsModel.findOneAndUpdate({ _id }, { dashboardConfig: { layoutOptions: { ...data } } });
        res.status(200).json({ message: 'success' });
    };
    updatePagesSettings = async (req, res) => {
        const { _id, data } = req.body;
        const result = await SettingsModel.findOneAndUpdate({ _id }, { pages: { ...data } });
        res.status(200).json({ message: 'sucess' });
    };
    updateGeneralSettings = async (req, res) => {
        const { _id, data } = req.body;
        const result = await SettingsModel.findOneAndUpdate({ _id }, { companyDetails: { ...data } });
        res.status(200).json({ messsage: 'success' });
    };
    uploads = async (req, res) => {
        const { _id, type } = req.body;
        const file = req?.file;
        const destination = '../../../../public/settings';
        if (file) {
            try {
                const result = await SettingsModel.findOne({ _id }).exec();
                switch (type) {
                    case 'favicon':
                        if (result) {
                            const oldFile = result.siteImages.favicon;
                            if (oldFile)
                                deleteItem(destination, oldFile);
                            result.siteImages.favicon = file.filename;
                            result?.save();
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'logo':
                        if (result) {
                            const oldFile = result.siteImages.logo;
                            if (oldFile)
                                deleteItem(destination, oldFile);
                            result.siteImages.logo = file.filename;
                            result?.save();
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'logoIcon':
                        if (result) {
                            const oldFile = result.siteImages.logoIcon;
                            if (oldFile)
                                deleteItem(destination, oldFile);
                            result.siteImages.logoIcon = file.filename;
                            result?.save();
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'darklogo':
                        if (result) {
                            const oldFile = result.siteImages.logoDark;
                            if (oldFile)
                                deleteItem(destination, oldFile);
                            result.siteImages.logoDark = file.filename;
                            result?.save();
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'pageBg':
                        if (result) {
                            const oldFile = result.siteImages.pagesBg;
                            if (oldFile)
                                deleteItem(destination, oldFile);
                            result.siteImages.pagesBg = file.filename;
                            result?.save();
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'bgImage':
                        if (result) {
                            const oldFile = result.siteImages.backgroundImage;
                            if (oldFile)
                                deleteItem(destination, oldFile);
                            result.siteImages.backgroundImage = file.filename;
                            result?.save();
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'aboutUsBg':
                        if (result) {
                            const oldFile = result.siteImages.aboutUsBg;
                            if (oldFile)
                                deleteItem(destination, oldFile);
                            result.siteImages.aboutUsBg = file.filename;
                            result?.save();
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    default:
                        return res.status(400).json({ message: 'Bad Request' });
                        break;
                }
            }
            catch (error) {
                //    next(error) 
                console.log(error);
            }
        }
    };
    removeUploads = async (req, res) => {
        const { _id, type, file } = req.body;
        const destination = '../../../public/uploads/settings';
        if (file) {
            try {
                const result = await SettingsModel.findOne({ _id }).exec();
                switch (type) {
                    case 'favicon':
                        if (result) {
                            result.siteImages.favicon = '';
                            result?.save();
                            deleteItem(destination, file);
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'logo':
                        if (result) {
                            result.siteImages.logo = '';
                            result?.save();
                            deleteItem(destination, file);
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'logoDark':
                        if (result) {
                            result.siteImages.logoDark = '';
                            result?.save();
                            deleteItem(destination, file);
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'pageBg':
                        if (result) {
                            result.siteImages.pagesBg = '';
                            result?.save();
                            deleteItem(destination, file);
                            res.status(200).json({ messsage: 'success' });
                        }
                    case 'logoIcon':
                        if (result) {
                            result.siteImages.logoIcon = '';
                            result?.save();
                            deleteItem(destination, file);
                            res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'bgImage':
                        if (result) {
                            result.siteImages.backgroundImage = '';
                            result?.save();
                            deleteItem(destination, file);
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    case 'aboutUsBg':
                        if (result) {
                            result.siteImages.aboutUsBg = '';
                            result?.save();
                            deleteItem(destination, file);
                            return res.status(200).json({ messsage: 'success' });
                        }
                        break;
                    default:
                        return res.status(400).json({ message: 'Bad Request' });
                        break;
                }
            }
            catch (error) {
                //    next(error) 
                console.log(error);
            }
        }
    };
}
export default new SettingsController();
