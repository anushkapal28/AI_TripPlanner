// components/Footer.tsx
import React from 'react';
import styles from '../styles/components/Footer.module.css';

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className="container flex items-center justify-between">
        <div>© {new Date().getFullYear()} TripMate</div>
        <div style={{ color: 'var(--muted)'}}>Built with ❤️.</div>
      </div>
    </footer>
  );
}
