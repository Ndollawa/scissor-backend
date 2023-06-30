import mongoose, {ConnectOptions} from 'mongoose';

type ConnectionOptionsExtend = {
    useNewUrlParser: boolean
    useUnifiedTopology?: boolean
  }
  
  const options: ConnectOptions & ConnectionOptionsExtend = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

const connectDB = async ()=>{
    try{
      const db = await mongoose.connect(`${process.env.ONLINE_DB_URL}`,options);
    } catch(err){
        console.error(err);
    } 
}

export default connectDB;