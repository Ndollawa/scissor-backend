class BaseController {
    model;
    //constructor 
    constructor(model) {
        this.model = model;
    }
    //create 
    create(req, res, next) {
        this.model.create(req.body, (err, data) => {
            if (err) {
                return next(err);
            }
            res.json(data);
        });
    }
    //read 
    read(req, res, next) {
        this.model.findById(req.params.id, (err, data) => {
            if (err) {
                return next(err);
            }
            res.json(data);
        });
    }
    //update 
    update(req, res, next) {
        this.model.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
            if (err) {
                return next(err);
            }
            res.json(data);
        });
    }
    //delete 
    delete(req, res, next) {
        this.model.findByIdAndRemove(req.params.id, req.body, (err, data) => {
            if (err) {
                return next(err);
            }
            res.json(data);
        });
    }
    //list 
    list(req, res, next) {
        this.model.find({}, (err, data) => {
            if (err) {
                return next(err);
            }
            res.json(data);
        });
    }
}
export default BaseController;
