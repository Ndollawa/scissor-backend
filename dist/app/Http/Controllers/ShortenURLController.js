import URLModel from '../../Models/URLModel.js';
import BaseController from './BaseController.js';
import shortid from 'shortid';
import validUrl from 'valid-url';
import IP from 'ip';
import requestIP from 'request-ip';
import axios from 'axios';
class UrlController extends BaseController {
    constructor() {
        super(URLModel);
    }
    // @desc Get all urls 
    // @route GET /urls
    // @access public
    selectAll = async (req, res) => {
        // Get all urls from MongoDB
        const url = await URLModel.find().sort({ createdAt: -1 }).lean();
        // If no urls 
        if (!url?.length) {
            return res.status(400).json({ message: 'No url found' });
        }
        res.json(url);
    };
    // @desc Create new url
    // @route POST /url
    // @access authorized user
    create = async (req, res) => {
        const { user, originalURL, customUrl } = req.body;
        // Confirm data
        if (!originalURL) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if the provided URL is valid
        if (!validUrl.isWebUri(originalURL)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        // Check for duplicate title
        const duplicate = await URLModel.findOne({ originalURL }).collation({ locale: 'en', strength: 2 }).lean().exec();
        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate url' });
        }
        let shortURL;
        if (customUrl && customUrl !== '') {
            shortURL = customUrl;
        }
        else {
            // Generate a new short URL
            shortURL = shortid.generate();
        }
        // Create and store the new URL 
        const newURL = await URLModel.create({ user, originalURL, shortURL });
        if (newURL) { // Created 
            return res.status(201).json({ status: 'success', message: 'New URL created', newURL });
        }
        else {
            return res.status(400).json({ status: 'error', message: 'Invalid URL data received' });
        }
    };
    // @desc Update a url
    // @route PATCH /url
    // @access authorized user
    update = async (req, res) => {
        const { user, originalURL, customUrl, _id, status, clicks } = req.body;
        // Confirm data
        if (!originalURL) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if the provided URL is valid
        if (!validUrl.isWebUri(originalURL)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        let shortURL;
        if (customUrl && customUrl !== '') {
            shortURL = customUrl;
        }
        else {
            // Generate a new short URL
            shortURL = shortid.generate();
        }
        const url = await URLModel.findOne({ _id }).exec();
        if (!url)
            return res.status(404).json({ status: 'error', message: ' URL Not Found' });
        const data = { originalURL: originalURL, shortURL, status };
        const updatedURL = await url.updateOne(data);
        return res.status(201).json({ status: 'success', message: 'URL updated successfully', updatedURL });
    };
    // @desc Update a url
    // @route PATCH /url
    // @access authorized user
    updateClick = async (req, res) => {
        const { _id, } = req.body;
        // Confirm data
        const url = await URLModel.findOne({ _id }).exec();
        if (!url)
            return res.status(404).json({ status: 'error', message: ' URL Not Found' });
        const ipAddress = IP.address();
        const userIP = requestIP.getClientIp(req);
        const apiKey = process.env.IP_GEOLOCATION_KEY;
        const getClientInfo = await axios.get(`http://ip-api.com/json/${userIP}`);
        //    return console.log(getClientInfo)
        const referrer = req.headers.referer;
        const userAgent = req.headers['user-agent'];
        const data = { ip: userIP, userAgent, referrer, ipInfo: { ...getClientInfo.data } };
        const updatedURL = await URLModel.updateOne({ _id }, // Specify the document to update based on the _id
        { clicks: url.clicks + 1,
            $push: {
                traffic: { ...data }
            } });
        return res.status(201).json({ status: 'success', message: 'URL updated successfully', updatedURL });
    };
    // @desc search for a shorturl and redirect to the original url
    // @route GET /url/:shortUrl
    // @access authorized user
    handleRedirect = async (req, res) => {
        const { shortURL } = req.params;
        // Confirm data
        if (!shortURL) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        const url = await URLModel.findOne({ shortURL }).exec();
        if (!url)
            return res.status(404).json({ status: 'error', message: ' URL Not Found' });
        const ipAddress = IP.address();
        const userIP = requestIP.getClientIp(req);
        const apiKey = process.env.IP_GEOLOCATION_KEY;
        const getClientInfo = await axios.get(`http://ip-api.com/json/${userIP}`);
        const referrer = req.headers.referer;
        const userAgent = req.headers['user-agent'];
        const data = { ip: userIP, userAgent, referrer, ipInfo: { ...getClientInfo } };
        const updatedURL = await URLModel.updateOne({ shortURL }, // Specify the document to update based on the _id
        { clicks: url.clicks + 1,
            $push: {
                traffic: { ...data }
            } });
        return res.redirect(url?.originalURL);
    };
    // @desc Delete a url
    // @route DELETE /url
    // @access authorized user
    delete = async (req, res) => {
        const { _id } = req.body;
        // Confirm data
        if (!_id) {
            return res.status(400).json({ message: 'url ID required' });
        }
        // Confirm url exists to delete 
        const url = await URLModel.findById({ _id }).exec();
        if (!url) {
            return res.status(400).json({ message: 'Url link not found' });
        }
        await url.deleteOne();
        res.status(200).json({ message: "success" });
    };
}
export default new UrlController();
