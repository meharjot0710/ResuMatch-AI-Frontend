import mongoose from 'mongoose';

export async function connectToDb() {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ResuMatchAI')
    .then(()=> console.log("MongoDB connected successfully."))
    .catch((err)=>{
        console.error("MongoDB connection unsucessful");
        process.exit(1);
    })
}