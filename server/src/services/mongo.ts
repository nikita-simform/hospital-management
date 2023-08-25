import mongoose from "mongoose";
require('dotenv').config();

const MONGO_URL: string = process.env.MONGO_URL || '';

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

export async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}
