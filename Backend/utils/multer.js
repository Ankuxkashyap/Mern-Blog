import multer from "multer";

const storage = multer.diskStorage({});

const uplode = multer({
    storage,
    limits:{
        fileSize:5 * 1024 * 1024,
    },
})

export default uplode