import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path'


// after install env - npm i env
dotenv.config()


await mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("MongoDb is connected");
    }).catch(err => {
        console.log(err)
    })

const __dirname = path.resolve()

const app = express();

app.use(express.json());
app.use(cookieParser()); // for read cookie from browser


function checkJwtInCookie(req, res, next) {
    const jwt = req.cookies['accessToken'];
    if (jwt) {
        res.status(200).send('JWT found in cookie');
    } else {
        console.log('JWT not found');
        res.status(401).send('Unauthorized: No token provided');
    }
}

// Use the middleware for routes that need JWT authentication
app.use('/loginOrNot', checkJwtInCookie, (req, res) => {
    res.send('This is a protected route');
});

app.listen(3000, () => {
    console.log('Server is running 3000!!!')
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})
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