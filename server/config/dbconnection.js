import mongoose from "mongoose";

const connectionToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectionToDB;