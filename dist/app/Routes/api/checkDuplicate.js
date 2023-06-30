import express from 'express';
const router = express.Router();
import checkDuplicate from '../../Http/Controllers/DuplicateController';
router.route('/')
    .post((req, res, next) => checkDuplicate(req, res));
export default router;
