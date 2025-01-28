import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongo_uri: string = process.env.MONGO_URI ?? 'default'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}