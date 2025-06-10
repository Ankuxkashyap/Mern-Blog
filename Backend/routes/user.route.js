import express from 'express';
import {registerUser,loginUser, getUserProfile} from '../controllers/user.controller.js'
import {authMiddleware }from '../middleware/auth.js';

const router = express.Router();

router.post('/',registerUser);
router.post('/login',loginUser);
router.get('/profile',authMiddleware,getUserProfile);


export default router;
