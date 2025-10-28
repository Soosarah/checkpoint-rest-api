import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
export async function connectDB() {
    try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB with monggoose');
    } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    }
}