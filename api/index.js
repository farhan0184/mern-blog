import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import cookieParser from 'cookie-parser';


// after install env - npm i env
dotenv.config()


await mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("MongoDb is connected");
    }).catch(err => {
        console.log(err)
    })


const app = express();

app.use(express.json());
app.use(cookieParser()); // for read cookie from browser

app.listen(3000, () => {
    console.log('Server is running 3000!!!')
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

// next middleware
app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500
    const message = err.message || "Internal server error";
    res.status(statuscode).json({
        success: false,
        statuscode,
        message
    })
})