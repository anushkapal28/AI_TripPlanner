// components/TripCard.tsx
import Link from 'next/link';
import React from 'react';
import styles from '../styles/components/TripCard.module.css';
type Trip = {
  id: string;
  title: string;
  days: number;
  shortDesc: string;
  image?: string;
  destination: string;
};

const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
  return (
    <article className={styles.card}>
      <img src={trip.image || '/images/sample-trip.jpg'} alt={trip.title} className={styles.image} />
      <div className={styles.content}>
        <h3>{trip.title}</h3>
        <p className={styles.dest}>{trip.destination} • {trip.days} days</p>
        <p className={styles.desc}>{trip.shortDesc}</p>
        <div className={styles.actions}>
          <Link href={`/trips/${trip.id}`} className={styles.view}>View</Link>
        </div>
      </div>
    </article>
  );
};

export default TripCard;
