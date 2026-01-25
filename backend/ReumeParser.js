import fs from "fs";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs"
import { FetchFeedBack } from "./ApiCall.js";


 export const Parser=async (req,res)=>{
    //console.log(req.file);
    //console.log(req.body.Resume)
    const path=req.file?.path;
    if(path==null || path==undefined){
        res.json({status:400,message:"no file detected"});
    return;
    }
    try{
       // console.log(req.body.jobdesc)
       let resumeData="";
       const bufferData=fs.readFileSync(path);
                    if(path.endsWith(".pdf")){
                    const data=new Uint8Array(bufferData);
                    const pdfdoc=await pdfjsLib.getDocument({data}).promise;
                        for(var i=1;i<=pdfdoc.numPages;i++){
                            const page=await pdfdoc.getPage(i);
                            const cont=await page.getTextContent();
                            resumeData+=cont.items.map(item => item.str).join(" ") + "\n";

                        }


                    }else if(path.endsWith(".docx")|| path.endsWith(".doc")){
                        resumeData= await mammoth.extractRawText(bufferData);

                    }else if(path.endsWith(".txt")){
                        resumeData=fs.readFileSync(path,'utf-8');

                    }else{
                        res.json({status:400,message:"file detected with unsupported format"});
                    }
    if(!resumeData){
     res.json({status:400,message:"Cannot parse the file"});
    }
     const GeminiRes= await FetchFeedBack(resumeData,req.body.jobdesc);

     res.json({status:200,Feedback:GeminiRes});
} catch(err){
    console.log(err);
    res.json({"error":err.message});
}


}



