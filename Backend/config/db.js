import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

const connectDb  = async() =>{ 
    try {
        const conn = await mongoose.connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
      }  
}
export default connectDb;