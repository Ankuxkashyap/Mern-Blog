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
      console.log(req.body);
       try{
            if (!title || !content || !dis || content.length === 0) {
          return res.status(400).json({ success: false, message: "Title and content are required" });
        }

        if(!dis){
          return res.status(400).json({ success: false, message: "desctipction are required" });
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

export const getBlog = async (req, res) => {
  const maxLimit = 5;
  const {page} = req.body;
  // console.log(page)
  try {
    const blogs = await Blogs.find({ draft: false })
      .populate("author", "personalInfo.profile_img personalInfo.username personalInfo.fullName -_id")
      .sort({ publishedAt: -1 })
      .select("blog_id title dis banner activity tags publishedAt -_id")
      .skip((page-1) * maxLimit)
      .limit(maxLimit);

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (err) {
    console.log("Error while fetching blogs:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getTrendingBlogs = async(req,res)=>{
  const maxLimit = 5
  try {
    const blogs = await Blogs.find({ draft: false })
      .populate("author", "personalInfo.profile_img personalInfo.username personalInfo.fullName -_id")
      .sort({"activity.total_reads":-1,"activity.total_likes":-1,"publishedAt": -1})
      .select("blog_id title publishedAt -_id")
      .limit(maxLimit);

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Treanding Blogs fetched successfully",
      blogs,
    });
  } catch (err) {
    console.log("Error while fetching tranding blogs:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
export const getBlogsbyCategory  = async(req,res) =>{
    const  {tag}  = req.body;
  
    try {
        const blogs = await Blogs.find({ tags:tag,draft: false })
          .populate("author", "personalInfo.profile_img personalInfo.username personalInfo.fullName -_id")
          .sort({ publishedAt: -1 })
          .select("blog_id title dis banner activity tags publishedAt -_id")

        if (!blogs || blogs.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No blogs found",
          });
        }

        res.status(200).json({
          success: true,
          message: "Blogs fetched successfully",
          blogs,
        });
      } catch (err) {
        console.log("Error while fetching blogs:", err);
        res.status(500).json({ success: false, error: err.message });
      }
}

export const getBlogBySearch = async (req, res) => {
  const { tag, query ,author} = req.body;
  // console.log(tag,query);
  try {
    let findQuery = { draft: false };

    if (tag) {
      findQuery.tags = tag; 
    }
    if (query) {
      findQuery.title = new RegExp(query, "i");
    }
    if(author){
      findQuery.author = author;
    }

    const blogs = await Blogs.find(findQuery)
      .populate("author", "personalInfo.profile_img personalInfo.username personalInfo.fullName -_id")
      .sort({ publishedAt: -1 })
      .select("blog_id title dis banner activity tags publishedAt -_id");

    if (!blogs || blogs.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No blogs found",
        });
    }

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (err) {
    console.error("Error while fetching blogs by search:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


 
