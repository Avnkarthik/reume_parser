import multer from "multer";
import express from "express"
import {Parser} from "./ReumeParser.js";

import cors from "cors"
import path from "path";
import { checkModels } from "./check.js";
const app=new express();
app.use(express.json());
app.use(cors({
    origin:"*",
}))
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==="application/pdf" ||  file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype==="text/plain")
        cb(null,true);
    else cb(new Error("Unsupported file type"),false);

}
const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:5*1024*1024}

    
})
 //checkModels();
app.post("/uploadResume",upload.single("Resume"),Parser);

app.listen("8010",()=>console.log("LIstening on port 8010"));
