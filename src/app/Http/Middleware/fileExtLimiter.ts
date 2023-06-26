import path from "path";
import { Response,Request,NextFunction } from "express";

const fileExtLimiter = (allowedExtArray:string[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const files = req.files!

        const fileExtensions:string[] = []
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key]?.name))
        })

        // Are the file extension allowed? 
        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))

        if (!allowed) {
            const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");

            return res.status(422).json({ status: "error", message });
        }

        next()
    }
}

export default fileExtLimiter