import express from 'express'
import uplode from '../utils/multer.js';
import  {uplodeBanner,publishBlog, saveDraft, getBlog,getTrendingBlogs,getBlogsbyCategory,getBlogBySearch }from '../controllers/blog.controller.js'
import { authMiddleware } from '../middleware/auth.js'
const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({message: " Blog route"})
})

router.post('/uplode-banner',uplode.single('image'),uplodeBanner);
router.post('/publish-blog',authMiddleware,publishBlog);
router.post('/Save-draft',authMiddleware,saveDraft);

router.post('/getBlogs',getBlog);
router.get('/trending-blogs',getTrendingBlogs);
router.post('/blog-category',getBlogsbyCategory);
router.post('/blog-search',getBlogBySearch);

export default router