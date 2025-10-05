import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { destination, days, travelers, travelType } = req.body;

  if (!destination || !days || !travelers || !travelType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = `
Generate a packing list for a ${days}-day ${travelType} trip to ${destination} for ${travelers} traveler(s).
Include clothes, toiletries, electronics, and miscellaneous items.
Format the response as a list separated by newlines.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    const packingText = result.response.text();
    res.status(200).json({ packingList: packingText });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate packing list" });
  }
}
