// components/ItineraryViewer.tsx
import React from 'react';
type DayPlan = { day:number, title:string, activities: string[] };

export default function ItineraryViewer({ itinerary }: { itinerary: DayPlan[] }) {
  return (
    <div style={{ display:'grid', gap:12 }}>
      {itinerary.map(d => (
        <div key={d.day} className="card">
          <h4 style={{ marginBottom:6 }}>Day {d.day}: {d.title}</h4>
          <ul style={{ color:'var(--muted)', marginLeft:18 }}>
            {d.activities.map((a,i)=> <li key={i}>{a}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
