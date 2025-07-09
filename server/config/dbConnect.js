import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.log(error);
  }
}
