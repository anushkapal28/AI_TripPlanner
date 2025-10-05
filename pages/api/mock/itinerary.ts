// pages/api/mock/itinerary.ts
import { NextApiRequest, NextApiResponse } from 'next';

type Body = {
  destination: string;
  days: number;
  travelStyle: string;
  interests: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end();

  const body = req.body as Body;
  const { destination = 'Destination', days = 3, travelStyle='Relaxed', interests='' } = body || {};

  // Build a simple mock itinerary
  const itineraries = [];
  for(let i=1;i<=days;i++){
    itineraries.push({
      day:i,
      title: `${destination} Highlights (Day ${i})`,
      activities: [
        `Morning: Explore central ${destination}`,
        `Lunch at a local spot`,
        `Afternoon: ${interests.split(',')[0] || 'Sightseeing'}`,
        `Evening: Relax & try local cuisine`
      ]
    });
  }

  // Estimate budget lightly
  const budget = `${Math.max(100, days * 80)} USD (estimated)`;

  // Respond like an AI payload
  res.status(200).json({ itinerary: itineraries, budget, pace: travelStyle });
}
