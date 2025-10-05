import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/components/CTA.module.css";

const CTA = () => {
  const router = useRouter();

  return (
    <section className={styles.ctaSection}>
      <h2>Ready to plan your next adventure?</h2>
      <button onClick={() => router.push("/create-trip")}>Start Now</button>
    </section>
  );
};

export default CTA;
