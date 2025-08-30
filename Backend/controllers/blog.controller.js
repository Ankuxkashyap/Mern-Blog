import cloudinary from "../config/cloudinary.js"
import uplode from "../utils/multer.js"
import Blogs from '../models/Blog.model.js'
import {v4 as uuidv4} from 'uuid'

export const uplodeBanner = async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({ success: 0, message: "No file uploaded" });
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "uploads",
        });

    return res.json({
      success: 1, 
      file: {
        url: result.secure_url,
      },
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export const publishBlog = async(req,res)=>{
      const {banner,title,dis,content,tags} = req.body
      const userId = req.user?.id;
      // console.log(userId);
      // console.log(req.user)
       try{
            if (!title || !content || content.length === 0) {
          return res.status(400).json({ success: false, message: "Title and content are required" });
        }

      
        const newBlog = new Blogs({
          blog_id: uuidv4(),
          banner,
          title,
          dis,
          content,
          tags,
          author: userId
        });

        await newBlog.save();

        res.status(201).json({
          success: true,
          message: "Blog published successfully",
          blog: newBlog,
        });
      }
      catch(err){
        console.log("Error to publish-blog : ",err)
        res.status(500).json({ success: false, error: err.message });
      }
}

export const saveDraft = async(req,res)=>{
      const {banner,title,dis,content,tags} = req.body
      const userId = req.user?.id;

       try{
            if (!title || !content || content.length === 0) {
          return res.status(400).json({ success: false, message: "Title and content are required" });
        }

      
        const newBlog = new Blogs({
          blog_id: uuidv4(),
          banner,
          title,
          dis,
          content,
          tags,
          author: userId,
          draft:true
        });

        await newBlog.save();

        res.status(201).json({
          success: true,
          message: "Blog SaveDraft successfully",
          blog: newBlog,
        });
      }
      catch(err){
        console.log("Error to SaveDarft-blog : ",err)
        res.status(500).json({ success: false, error: err.message });
      }
}

 
