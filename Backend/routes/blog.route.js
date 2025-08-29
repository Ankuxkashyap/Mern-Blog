import express from 'express'
import uplode from '../utils/multer.js';
import  {uplodeBanner }from '../controllers/blog.controller.js'

const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({message: " Blog route"})
})

router.post('/uplode-banner',uplode.single('image'),uplodeBanner)

export default router