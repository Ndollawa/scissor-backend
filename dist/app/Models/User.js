import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;
// :userInterface 
const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    dob: {
        type: String
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not supported'
        },
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    occupation: {
        type: String
    },
    bio: {
        type: String
    },
    userImage: {
        type: String
    },
    accountStatus: {
        type: String,
        enum: {
            values: ['pending', 'active', 'banned', 'disabled', 'deactivated', 'deleted'],
            message: '{VALUE} is not supported'
        },
        default: 'active',
        required: true
    },
    verificationStatus: {
        type: Boolean,
        default: false,
        required: true
    },
    online: {
        status: { type: Boolean },
        lastSeen: { type: Date },
    },
    accountSecurity_2FA: {
        type: Boolean,
        default: false,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 1003,
        },
        Admin: Number,
        Dev: Number,
        Staff: Number,
    },
    refreshToken: [String]
}, { timestamps: true });
UserSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
}).set(function (v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ firstName, lastName });
});
UserSchema.plugin(mongoosePaginate);
export default mongoose.model('User', UserSchema);
