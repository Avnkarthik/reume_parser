import React from 'react'
import {useDropzone} from "react-dropzone"
import './App.css'
function Dragdrop({setResume}) {
    const {getRootProps,getInputProps,isDragActive}=useDropzone({
  accept:{
     "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"]

  },
  maxSize:5*1024*1024,
  maxFiles:1,
  onDrop:(acceptedfile)=>{
    console.log(acceptedfile)
    setResume(acceptedfile[0]);
  }

    });
  return (
     <div {...getRootProps()}  className='box'>
      
      
      <input {...getInputProps()} type='file' className='file-line' />{
        isDragActive? <h1>parsing....</h1>:<h1>Drag and  Drop or upload your resume</h1>
      }

    </div>
  )
}

export default Dragdrop