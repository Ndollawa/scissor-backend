import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromise = fs.promises;
const deleteItem = async (destination, item) => {
    if (fs.existsSync(path.join(__dirname, destination, item))) {
        await fsPromise.unlink(path.join(__dirname, destination, item));
    }
};
export default deleteItem;
