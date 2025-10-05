// components/Hero.tsx
import React from 'react';
import styles from '../styles/components/Hero.module.css';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className="container flex" style={{ gap: '32px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h1 className="h1">Plan unforgettable trips with AI — in minutes.</h1>
          <p style={{ color: 'var(--muted)', marginTop: '12px' }}>
            Generate itineraries, budgets and packing lists tailored to your preferences. Collaborative trip planning with friends coming soon.
          </p>

          <div style={{ marginTop: '22px', display: 'flex', gap: '12px' }}>
            <Link href="/create-trip" className={styles.primaryBtn}>Generate my trip</Link>
            <Link href="/trips" className={styles.secondaryBtn}>Browse trips</Link>
          </div>
        </div>

        <div className={styles.preview}>
          <img src="/images/hero.jpg" alt="travel preview" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
