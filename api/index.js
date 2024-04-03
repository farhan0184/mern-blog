import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';


// after install env - npm i env
dotenv.config()

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("MongoDb is connected");
    }).catch(err => {
        console.log(err)
    })

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running 3000!!!')
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

// next middleware
app.use((err, req, res, next)=>{
    const statuscode = err.statuscode || 500
    const message = err.message || "Internal server error";
    res.status(statuscode).json({
        success: false,
        statuscode,
        message
    })
})