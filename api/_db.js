import mongoose from 'mongoose';

// Cached connection
let cachedDb = null;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshort';

export async function connectDB() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    cachedDb = mongoose.connection;
    console.log('MongoDB connected');
    return cachedDb;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectDB;
