import express from 'express';
import { createComment,getPostComments, getPostComment, likeComment, deleteComment, updateComment } from '../controllers/comment.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyUser, createComment)
router.get("/getPostComments", verifyUser, getPostComments)
router.get('/getPostComments/:postId', getPostComment)
router.put("/likeComment/:commentId", verifyUser, likeComment)
router.delete("/deleteComment/:commentId", verifyUser, deleteComment)
router.put("/updateComment/:commentId", verifyUser, updateComment)

export default router