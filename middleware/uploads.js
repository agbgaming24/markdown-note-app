import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/"),
    filename:(req,file,cb)=>cb(null,file.originalname)
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype === 'text/markdown' || file.originalname.endsWith('.md')){
        cb(null,true)
    }
    else{
        cb(new Error("Only .md files allowed"),false)
    }
}

export const upload= multer({storage,fileFilter})