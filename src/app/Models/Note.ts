import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose, { SchemaType } from 'mongoose';
const Schema = mongoose.Schema;

const NoteSchema =  new Schema({
    title:{
        type:String,
        required: true
    },

    body:{
        type:String,
        required: true,
        unique: true
    },
    status:{
        type:String,
        required: true,
        enum:{
            values:["active",'inactive'],
            message: '{VALUE} not supported'
        },
        default:'active'
    },
    attachments:{
        type:Array
    }
   
},{timestamps:true} );
NoteSchema.plugin(mongoosePaginate);

export default mongoose.model('Note',NoteSchema);