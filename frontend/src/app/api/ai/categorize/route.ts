import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { content, categories } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are an intelligent note organizer.
      Analyze the following note content: "${content}".
      
      Classify it into EXACTLY one of these categories: ${categories.map((c: any) => c.name).join(', ')}.
      
      Rules:
      1. Return ONLY the JSON object with the category ID. Format: {"id": 123}.
      2. If it doesn't fit well, choose the best generic match.
      3. Do not include markdown formatting, just raw JSON.
      
      Categories Map: ${JSON.stringify(categories)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json|```/g, '').trim();
    
    return NextResponse.json(JSON.parse(cleanJson));

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to categorize" }, { status: 500 });
  }
}