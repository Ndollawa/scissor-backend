import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose, { SchemaType } from 'mongoose';
const Schema = mongoose.Schema;

const TodoSchema =  new Schema({
    todo:{
        type:String,
        required: true
    },

    status:{
        type:String,
        required: true,
        enum:{
            values:["completed",'pending','cancelled','onhold'],
            message: '{VALUE} not supported'
        },
        default:'pending'
    },
    attachments:{
        type:Array
    }
   
},{timestamps:true} );
TodoSchema.plugin(mongoosePaginate);

export default mongoose.model('Todo',TodoSchema);