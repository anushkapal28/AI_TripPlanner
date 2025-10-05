// components/TripList.tsx
import React from 'react';
import TripCard from './Tripcard';

type Trip = {
  id: string;
  title: string;
  days: number;
  shortDesc: string;
  image?: string;
  destination: string;
};

export default function TripList({ trips }: { trips: Trip[] }) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {trips.map((t) => <TripCard key={t.id} trip={t} />)}
    </div>
  );
}
