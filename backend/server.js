import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? ["https://wellness-space.vercel.app", "http://localhost:8080"] // Add your frontend domain here
    : "http://localhost:8080",
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import userRoutes from "./routes/user.route.js";
import sessionRoutes from "./routes/session.route.js";

// use routes
app.use("/api/users", userRoutes);
app.use("/api", sessionRoutes);

// ✅ error middleware 
app.use(errorMiddleware);

export { app };
