
import { Request, Response, NextFunction } from 'express'; 
import mongoose, { Error, Model, Models } from 'mongoose'; 


 abstract class BaseController {
    protected model:Model<any>;
     //constructor 
     constructor (model:Model<any>) {
         this.model = model;
         }
      //create 
      public create(req: Request, res: Response, next: NextFunction) {
         this.model.create(req.body, (err:Error, data:any) => {
             if (err) { return next(err); } 
             res.json(data); 
            });
              } 
         //read 
        public read(req: Request, res: Response, next: NextFunction) { 
            this.model.findById(req.params.id, (err:Error, data:any) => {
                 if (err) {
                     return next(err);
                 }
                  res.json(data);
                 });
         } 
            //update 
    public update(req: Request, res: Response, next: NextFunction) {
         this.model.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data:any) => {
             if (err) {
                 return next(err); 
            } 
            res.json(data);
         });
     }
          //delete 
    public delete(req: Request, res: Response, next: NextFunction) {
         this.model.findByIdAndRemove(req.params.id, req.body, (err, data) => {
             if (err) { return next(err); } 
             res.json(data);
             });
             } 
         //list 
    public list(req: Request, res: Response, next: NextFunction) {
         this.model.find({}, (err:Error, data:any) => {
         if (err) { return next(err); }
          res.json(data);
         }); 
        } 
}
export  default BaseController