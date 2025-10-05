// /pages/api/itinerary.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { destination, days, travelType, budget } = req.body;

  if (!destination || !days || !travelType || !budget)
    return res.status(400).json({ error: "Missing required fields" });

  const prompt = `
You are a travel planner AI. Create a detailed ${days}-day itinerary for a ${travelType} trip to ${destination}.
Consider a budget of ${budget}. Include activities, meals, and key highlights for each day.
Respond in bullet points organized by day with "no headings no bold" whole content in just plain text and same size.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const itineraryText = result.response.text();

    res.status(200).json({ itinerary: itineraryText });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
}
