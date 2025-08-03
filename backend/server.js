import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
  origin: "http://localhost:8080", // ✅ will use env in prod
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
