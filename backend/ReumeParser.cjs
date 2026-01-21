const fs=require("fs");
const mammoth= require("mammoth");
const pdfParse=require("pdf-parse");

 const Parser=async (req,res)=>{
    console.log(req.file);
    console.log(req.body)
    const path=req.file?.path;
    if(path==null || path==undefined)
        res.json({status:400,message:"no file detected"});
    try{
       let resumeData;
       const bufferData=fs.readFileSync(path);
    if(path.endsWith(".pdf")){
        resumeData= await pdfParse(bufferData);
        resumeData=resumeData.text;


    }else if(path.endsWith(".docx")|| path.endsWith(".doc")){
          resumeData= await mammoth.extractRawText(bufferData);

    }else if(path.endsWith(".txt")){
        resumeData=fs.readFileSync(path,'utf-8');

    }else{
         res.json({status:400,message:"file detected with unsupported format"});
    }
    if(!resumeData)
        res.json("Un expected error")
    res.json({status:"200",resumeData});
} catch(err){
    res.json({"error":err.message});
}


}

module.exports={ Parser };