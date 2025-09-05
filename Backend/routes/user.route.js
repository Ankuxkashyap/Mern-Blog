import express from 'express';
import {registerUser,loginUser, getUserProfile,getUserBySearch,getProfile} from '../controllers/user.controller.js'
import {authMiddleware }from '../middleware/auth.js';

const router = express.Router();

router.post('/',registerUser);
router.post('/login',loginUser);
router.get('/profile',authMiddleware,getUserProfile);
router.post('/user-profile',getProfile)
router.post('/search-user',getUserBySearch )

export default router;
