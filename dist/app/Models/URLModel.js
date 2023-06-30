import mongoosePaginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const URLSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    originalURL: {
        type: String,
        required: true,
        unique: true
    },
    shortURL: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    traffic: [{
            referrer: {
                type: String,
                required: true,
            },
            ip: {
                type: String,
                required: true,
            },
            userAgent: {
                type: String,
                required: true,
            },
            ipInfo: {
                type: Object,
            }
        }],
    status: {
        type: String,
        required: true,
        enum: {
            values: ["active", 'inactive'],
            message: '{VALUE} not supported'
        },
        default: 'active'
    }
}, { timestamps: true });
URLSchema.plugin(mongoosePaginate);
export default mongoose.model('URL', URLSchema);
