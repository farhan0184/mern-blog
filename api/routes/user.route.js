import express from 'express';
import {deleteUser, getAllUsers,getUser, Signout, test, updateUser} from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();
router.get('/test', test)
router.put('/update/:userId', verifyUser, updateUser)
router.delete('/delete/:userId', verifyUser, deleteUser)
router.post('/signout',Signout)
router.get('/user-list', verifyUser, getAllUsers )
router.get("/:userId", getUser)


export default router