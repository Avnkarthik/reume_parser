import axios from 'axios';
import React, { useState } from 'react'
import Dragdrop from './Dragdrop';
import ReactMarkdown from "react-markdown";

function Resume() {

  const [resume,setResume]=useState(null);
   const [jd,setjd]= useState("Enter Your job description here.");
const [feed,setfeed]=useState();
    
  const [loading,setLoading]=useState(false);
   const sendResume=async()=>{
      if(!resume){
        console.log("select resume");
      return;
      }
      setLoading(true);
      let Data=new FormData();
      Data.append("Resume",resume);
      Data.append("jobdesc",jd);
       const res= await axios.post("http://localhost:8010/uploadResume",Data,{
        headers:{"Content-Type":"multipart/form-data"}
       });
       console.log(res.data.Feedback);
       setfeed(res.data.Feedback);
       setLoading(false);
   }
  return (
   <div>
    
     <Dragdrop setResume={setResume} setjd={setjd} jd={jd}/> 
   { feed? 
       <div style={{border:"2px solid black" , borderRadius:"10px",color:"red", background:"black"}}><h1>Suggestions :</h1>
       <ReactMarkdown>{feed}</ReactMarkdown> 
      </div>
      : loading?<h1> Loading please wait</h1>:
      <button className='btn' onClick={sendResume} style={{margin:"50px",padding:"10px", backgroundColor:"green" , borderRadius:"5px"}} >Upload Resume</button>
   }
   </div>
  )
}

export default Resume