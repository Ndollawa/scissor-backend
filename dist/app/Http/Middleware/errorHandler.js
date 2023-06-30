import { logEvents } from './logEvents';
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.messsage}`, 'errLog.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
};
export default errorHandler;
