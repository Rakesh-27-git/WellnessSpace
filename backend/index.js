import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./server.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection Failed: ", err);
  });
