// pages/trips/index.tsx
import React from 'react';
import useSWR from 'swr';
import TripList from '../../components/TripList';

type Trip = { id:string, title:string, destination:string, days:number, shortDesc:string, image?:string };

const fetcher = (url:string) => fetch(url).then(r=>r.json());

export default function TripsPage(){
  const { data, error } = useSWR<Trip[]>('/api/trips', fetcher);

  if (error) return <div className="container">Failed to load trips.</div>;
  if (!data) return <div className="container">Loading...</div>;

  return (
    <section className="container" style={{ paddingTop:24 }}>
      <h2 className="h1">Trips</h2>
      <p style={{ color:'var(--muted)', marginTop:8 }}>Browse sample trips or generated itineraries.</p>
      <div style={{ marginTop:18 }}>
        <TripList trips={data} />
      </div>
    </section>
  );
}
