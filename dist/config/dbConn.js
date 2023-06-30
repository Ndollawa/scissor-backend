import mongoose from 'mongoose';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const connectDB = async () => {
    try {
        const db = await mongoose.connect(`${process.env.DATABASE_URL}`, options);
    }
    catch (err) {
        console.error(err);
    }
};
export default connectDB;
