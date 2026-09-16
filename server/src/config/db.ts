import mongoose from "mongoose";

import { env } from "./env.js";

export const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(env.DATABASE_URL);
        console.log(`✅ MongoDB Connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};

export const disconnectDatabase = async (): Promise<void> => { 
    await mongoose.disconnect();
}