import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const checkModels = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GoogleApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    console.log("Checking access to 'gemini-2.5-flash'...");
    const result = await model.generateContent("Test");
    console.log("✅ SUCCESS! You can use: gemini-2.5-flash");
  } catch (error) {
    console.log("❌ Failed on 2.5-flash. Trying 'gemini-3-flash'...");
    try {
        const model3 = genAI.getGenerativeModel({ model: "gemini-3-flash" });
        await model3.generateContent("Test");
        console.log("✅ SUCCESS! You can use: gemini-3-flash");
    } catch (err2) {
        console.error("\nCRITICAL: Could not find a working model. Listing all available...");
        // Fallback to raw listing if direct calls fail
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GoogleApiKey}`);
        const data = await response.json();
        console.log("Your available models:", data.models?.map(m => m.name));
    }
  }
};
