import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Trip from "../../models/Trip";
import jwt from "jsonwebtoken"; // add this

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // --- Authenticate using JWT ---
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Not authenticated" });

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  let userId;
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    userId = decoded.id; // user id from JWT payload
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }

  // --- Handle requests ---
  if (req.method === "GET") {
    const trips = await Trip.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json(trips);
  }

  if (req.method === "POST") {
    const { title, destination, days, itinerary, budget, pace } = req.body;
    if (!title || !destination || !days || !budget)
      return res.status(400).json({ error: "Missing required fields" });

    const newTrip = await Trip.create({
      user: userId,
      title,
      destination,
      days,
      itinerary: itinerary || [],
      budget,
      pace,
    });

    return res.status(201).json(newTrip);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
