import axios from 'axios';
import React, { useState } from 'react'
import Dragdrop from './Dragdrop';

function Resume() {
  const [resume,setResume]=useState(null);
   const sendResume=async()=>{
      if(!resume){
        console.log("select resume");
      return;
      }
      let Data=new FormData();
      Data.append("Resume",resume);
       const res=axios.post("http://localhost:8010/uploadResume",Data,{
        headers:{"Content-Type":"multipart/form-data"}
       });
       console.log(res);
   }
  return (
   <div>
     <Dragdrop setResume={setResume}/> 
    <button className='btn' onClick={sendResume} >Upload Resume</button>
   </div>
  )
}

export default Resume