import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
export const test = (req, res) => {
    res.json({ message: "API is working!" })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update this id!"))
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "Password must be at least 6 characters!"))
        }
        if (!req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) {
            return next(errorHandler(400, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character!"))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 12)
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, "Username must be between 7 and 20 characters!"))
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, "Username must contain only letters and numbers!"))
        }
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "Username must not contain spaces!"))
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "Username must be lower case!"))
        }

    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            }
        }, { new: true })
        const { password, ...rest } = updateUser._doc;
        res.status(200).json({ data: rest, message: "User updated successfully" })
    } catch (error) {
        return next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this id!"))
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).clearCookie('access_token').json({ message: "User deleted successfully" })
    } catch (error) {
        return next(error)
    }
}

export const Signout = async (req, res, next) => {
    try {
        res
            .status(200)
            .clearCookie('access_token')
            .json({ message: "User has been signed out" })
    } catch (error) {
        next(error)
    }
}


export const getAllUsers = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403, "You are not allowed to get all users!"))
    }

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit)
        
        const userWithOutPassword = users.map(user => {
            const { password, ...rest } = user._doc
            return rest
        })
        
        const totalUsers = await User.countDocuments()
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(), 
            now.getMonth() - 1, 
            now.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt: {
                $gte: oneMonthAgo
            }
        })

        res.status(200).json({
            users: userWithOutPassword,
            totalUsers,
            lastMonthUsers
        })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) {
            return next(errorHandler(404, "User not found!"))
        }
        const { password, ...rest } = user._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
