import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
export const signup = async  (req, res, next )=>{ // next is middleware
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        // return res.status(400).json({message: "All fields are required"});
        return next(errorHandler( 400 ,"All fields are required"));

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

export const signin = async(req, res, next)=>{

    const {email, password} = req.body;
    if(!email || !password || email === "" || password === ""){
        return next(errorHandler( 400 ,"All fields are required"));
    }

    try {
        const validUser = await User.findOne({email})
        if(!validUser){
           return next(errorHandler( 404 ,"User not found"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        // console.log(validPassword)
        if(!validPassword){
            return next(errorHandler( 400 ,"Invalid Authentication"));
        }
        const {password:pass, ...rest} = validUser._doc

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(200).cookie('access_token', token, {httpOnly: true}).json({data:rest,message: 'Login successfully'})
    } catch (error) {
        next(error)
    }
}

