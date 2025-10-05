// pages/api/generateItinerary.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { destination, days, preferences } = req.body;

  if (!destination || !days) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Create a ${days}-day travel itinerary for ${destination}.
      Preferences: ${preferences || "general"}.
      For each day, include:
      - Morning activities
      - Afternoon activities
      - Evening activities
      - Short descriptions
      - Local tips or food recommendations.
      Format response as plain text for each day no heading.
    `;

    const result = await model.generateContent(prompt);
    const itineraryText = result.response.text();

    return res.status(200).json({ itinerary: itineraryText });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      message: "Failed to generate itinerary",
      error: error.message || error.toString(),
    });
  }
}
