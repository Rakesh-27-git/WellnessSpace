import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log(
      ` \n DATABASE connection SUCCESS !!  DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("DATABASE connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
