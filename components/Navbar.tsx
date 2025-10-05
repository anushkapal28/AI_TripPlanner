/*/ components/Navbar.tsx
import Link from 'next/link';
import React from 'react';
import styles from '../styles/components/Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container flex items-center justify-between">
        <Link href="/" className={styles.brand}>
          <span className={styles.logo}>✈️</span>
          <span className={styles.title}>TripGenie</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/trips">Trips</Link>
          <Link href="/create-trip" className={styles.cta}>Create Trip</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
*/


// components/Navbar.tsx
import Link from 'next/link';
import React from 'react';
import styles from '../styles/components/Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container flex items-center justify-between">
        <Link href="/" className={styles.brand}>
          <span className={styles.logo}>✈️</span>
          <span className={styles.title}>TripMate</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/trips">Trips</Link>
          <Link href="/create-trip" className={styles.cta}>Create Trip</Link>

          {/* Login & Signup Buttons */}
          <Link href="/login" className={styles.authButton}>Login</Link>
          <Link href="/signup" className={styles.authButton}>Signup</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
