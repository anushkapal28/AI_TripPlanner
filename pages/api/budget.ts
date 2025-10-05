import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

interface BudgetData {
  flightCost: number;
  accommodationCost: number;
  foodCost: number;
  activitiesCost: number;
  total: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BudgetData | { rawResponse?: string; error?: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {from, destination, days, travelers, preference } = req.body;

  if (!from ||!destination || !days || !travelers || !preference) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = `
Generate a trip budget for a ${days}-day ${preference} trip to ${destination} from ${from} for ${travelers} traveler(s).
Return the response in this order and nothing more than these 6
  Flight Cost: 0
  Accommodation Cost: 0,
  Food Cost: 0
  Activities Cost: 0
  Total: 0
  Visa Detail: "",
must be a non zero and Values should be realistic and in INR with symbol. if the current city and destination city are from different countries give detail of visa that No Visa required to travel/Visa on arrival available/Visa required any one of these three.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    try {
      const parsed: BudgetData = JSON.parse(aiText);

      // Validate keys exist and are numbers
      const keys: (keyof BudgetData)[] = [
        "flightCost",
        "accommodationCost",
        "foodCost",
        "activitiesCost",
        "total",
      ];
      const valid = keys.every(
        (key) => typeof parsed[key] === "number" && !isNaN(parsed[key])
      );

      if (!valid) throw new Error("Invalid budget format");

      res.status(200).json(parsed);
    } catch (err) {
      console.warn("Invalid JSON from AI, returning raw text", aiText);
      res.status(200).json({ rawResponse: aiText });
    }
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate budget" });
  }
}