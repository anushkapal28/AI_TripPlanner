import React from "react";
import styles from "../styles/components/Testimonials.module.css";

const Testimonials = () => {
  const reviews = [
    { name: "Aarav", text: "This planner made my Europe trip stress-free!" },
    { name: "Sofia", text: "AI-generated itinerary was spot on!" },
    { name: "Rahul", text: "Loved the budgeting and packing features!" },
  ];

  return (
    <section className={styles.testimonialsSection}>
      <h2>What Our Users Say</h2>
      <div className={styles.testimonialsGrid}>
        {reviews.map((r, i) => (
          <div className={styles.testimonialCard} key={i}>
            <p>"{r.text}"</p>
            <h4>- {r.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
