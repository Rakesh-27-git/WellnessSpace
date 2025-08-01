import cors from 'cors';
import express from 'express';
import cookieParser from "cookie-parser"

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// import routes

import userRoutes from './routes/user.route.js';
import sessionRoutes from './routes/session.route.js';

// routes declaration

app.use('/api/users', userRoutes);
app.use('/api', sessionRoutes);

export { app };