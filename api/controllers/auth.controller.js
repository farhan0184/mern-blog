import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
export const signup = async  (req, res, next )=>{ // next is middleware
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        // return res.status(400).json({message: "All fields are required"});
        next(errorHandler( 400 ,"All fields are required"));

    }

    // for password hash use install bcryptjs
    const hashPassword = bcryptjs.hashSync(password, 12)
    const newUser = new User({
        username,
        email,
        password: hashPassword
    })

    try {
        await newUser.save()
        res.status(200).json({message: 'Sign up successfully'}) 
    } catch (error) {
        // res.status(500).json({message: error.message})
        next(error)
    }
    

}

