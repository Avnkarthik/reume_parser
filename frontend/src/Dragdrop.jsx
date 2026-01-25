
import {useDropzone} from "react-dropzone"
import './App.css'
import { useState } from "react";
function Dragdrop({setResume,setjd,jd}) {
  const [rset,setrset]=useState(null);
    const {getRootProps,getInputProps,isDragActive}=useDropzone({
  accept:{
     "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"]

  },
  maxSize:5*1024*1024,
  maxFiles:1,
  onDrop:(acceptedfile)=>{
   // console.log(acceptedfile.path);
     console.log(acceptedfile)
    setResume(acceptedfile[0]);
    setrset(acceptedfile[0]);
  }

    });
   
  return (
    <div>
     <div {...getRootProps()}  className='box'>
      
      
      <input {...getInputProps()} type='file' className='file-line' />{
        isDragActive? <h1>parsing....</h1>:rset? <h1 style={{margin:"auto", textAlign:"center"}}> {rset.name}</h1> : <h1>Drag and  Drop or upload your resume</h1>
      }
     


    </div>
    <div style={{height:"100px", width:"1000px", padding:"50px"}}>
      <textarea value={jd} style={{height:"100px", width:"1000px"}} onChange={e=>setjd(e.target.value)}>

      </textarea>
    </div>
  
    </div>
  )
}

export default Dragdrop