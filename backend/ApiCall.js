import "dotenv/config";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const FetchFeedBack = async (resume, jobdescription) => {
  try {
    console.log("fetch feedback");
    console.log("API Key:", process.env.GoogleApiKey);

     const genAi=new GoogleGenerativeAI(process.env.GoogleApiKey);
     const Aimodel=genAi.getGenerativeModel({model:"gemini-2.5-flash"});
     const prompt=`Resume is: ${resume}
Job Description is: ${jobdescription}

Now, give me 3 parts in response:
1. Matching score of the resume for the job description
2. Points to be mentioned to get the resume shortlisted
3. Keywords in the job description`;
  const result= await Aimodel.generateContent(prompt);
  const response=await result.response
  const res=response.text();

    console.log("Result got:", res);
    return res;
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    throw err;
  }
};