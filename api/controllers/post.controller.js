import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    // console.log(req)
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create a post!"))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Title and Content are required!"))
    }

    const slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "-");

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    })

    try {
        const savedPost = await newPost.save()
        res.status(201).json({ data: savedPost, message: "Post created successfully" })
    } catch (error) {
        next(error)
    }
}


export const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === "asc" ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: "i" } },
                    { content: { $regex: req.query.searchTerm, $options: "i" } },
                ],
            })
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit)
        // total posts
        const totalPosts = await Post.countDocuments();
        // month
        const now = new Date()
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const lastMonthPosts = await Post.countDocuments({
            createdAt: {
                $gte: oneMonthAgo,
            }
        })

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })

    } catch (error) {
        next(error)
    }
}

export const deletepost = async (req, res, next) => {
    // console.log(req.user.id, req.params.userId)
    if (req.user.isAdmin && req.user.id === req.params.userId) {
        try {
            await Post.findByIdAndDelete(req.params.postId)
            res.status(200).json({ message: "Post deleted successfully" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    } else {
        return next(errorHandler(403, "You are not allowed to delete a post!"))
    }

}


export const updatepost = async (req, res, next) => {
    // console.log(req.user.id, req.params.userId, req.user.isAdmin)
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update a post!"))
    }
    else {
        try {
            const slug = req.body.title
                .split(" ")
                .join("-")
                .toLowerCase()
                .replace(/[^a-zA-Z0-9-]/g, "-");
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.postId,
                {
                    $set: {
                        title: req.body.title,
                        category: req.body.category,
                        image: req.body.image,
                        content: req.body.content,
                        slug: slug
                    }
                },
                { new: true }
            )
            res.status(200).json({data: updatedPost, message: "Post updated successfully" })
        } catch (error) {
            next(error)
        }
    }
}