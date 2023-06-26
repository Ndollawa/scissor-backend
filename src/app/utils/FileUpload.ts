// imports
 import express, { Request, Response } from 'express'; 
 import path from 'path'; 
 import fs from 'fs';
  /** * This is the FileUpload class. */ 
  class FileUpload {
     private uploadPath: string; 
     private acceptedFileTypes: string[]; 
     private acceptedFileSize: number;
     private status: string[]; 
     private message: number;
     private uploadDetails: string[]; 
     private typeChecking: boolean;
     private permittedFileTypes: string[]; 
     private notTrustedFileTypes: string[]; 
     private uploadItem: any;
      /** * Constructor *
       *  @param {string} uploadPath Path to where uploads will be placed
       *  
       * * @param {string[]} acceptedFileTypes Array of accepted file types (eg. ["image/jpg", "image/gif"]) 
       * * @param {number} acceptedFileSize Max size of accepted files in MB * @returns void */ 

    constructor (uploadPath: string, acceptedFileTypes: string[], acceptedFileSize: number) {
         this.uploadPath = uploadPath; 
         this.acceptedFileTypes = acceptedFileTypes; 
         this.acceptedFileSize = acceptedFileSize;
         } 
         /** * Checks if file type is acceptable
          *  * @param {string} fileType File type to check (eg. "image/jpg") 
          * * @returns {boolean} true if accepted, false if not */
    private isAcceptableFileType(fileType: string): boolean {
             return this.acceptedFileTypes.includes(fileType);
             } 
             /** * Checks if file size is acceptable 
              * * @param {number} fileSize File size to check (in bytes) 
              * * @returns {boolean} true if accepted, false if not */ 
    private isAcceptableFileSize(fileSize: number): boolean {
         return fileSize <= this.acceptedFileSize * 1048576;
         }
         
        /** * Checks if filename is already taken, and renames if so
         *  * @param {string} filename Filename to check * 
         * @returns {string} The new filename */
    private checkFilename(filename: string): string {
         let newFilename = filename; 
         let ext = path.extname(filename); 
         if (fs.existsSync(this.uploadPath + filename)) {
             let i = 1; 
             do { newFilename = path.basename(filename, ext) + '-' + i++ + ext;
             } 
             while (fs.existsSync(this.uploadPath + newFilename)); } return newFilename; 
            } 
            /** * Uploads a file * 
             * @param {Request} req Request object 
             * * @param {Response} res Response object 
             * * @returns {any} */
     public uploadFile(req: Request, res: Response): any {
         if(!req.files || Object.keys(req.files).length === 0) {
             return res.status(400).send('No files were uploaded.'); 
            } 
            let uploadedFile = req.files! 
            console.log(uploadedFile)
    Object.keys(uploadedFile).forEach((key:any) => {
     console.log(key)
     console.log(uploadedFile[key].mimetype)
            let fileType = uploadedFile[key]?.mimetype; 
            let fileSize = uploadedFile[key]?.size; 
            if (!this.isAcceptableFileType(fileType)) { 
                return res.status(400).send('File type not accepted.');
             } 
            if (!this.isAcceptableFileSize(fileSize)) {
                 return res.status(400).send('File size too large.'); 
                } 
            let newFilename = this.checkFilename(uploadedFile[key]?.filename); 
            let fileUploadPath = this.uploadPath + newFilename; 
            uploadedFile[key]?.mv(fileUploadPath, function(err:any) {
                 if (err) { return res.status(500).send(err); 
                }
                 res.send('File uploaded to ' + fileUploadPath); 
            });
      })
    
      } 
            /** * Error handler for Multer 
             * * @param {any} err Error * 
             * @param {Request} req Request object 
             * * @param {Response} res Response object 
             * * @param {any} next Next middleware *
             *  @returns void */ 
    
     } 
export default FileUpload;

      