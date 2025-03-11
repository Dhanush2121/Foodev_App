import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Dhanush2121:Dhanush2121@dhanush2121.ababc.mongodb.net/FOODEV ').then(()=>console.log("DataBase Connected"));
}