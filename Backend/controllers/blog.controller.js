import cloudinary from "../config/cloudinary.js"
import uplode from "../utils/multer.js"

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

 
