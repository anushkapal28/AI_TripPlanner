import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/components/Features.module.css";

const Features = () => {
  const router = useRouter();

  const features = [
    {
      title: "AI-Powered Itineraries",
      desc: "Get custom daily plans designed just for your interests.",
      icon: "🧭",
      link: "/ai-itinerary",
    },
    {
      title: "Smart Budgeting",
      desc: "AI helps you balance comfort and cost.",
      icon: "💰",
      link: "/budget",
    },
    {
      title: "Packing Assistant",
      desc: "Get a smart packing checklist based on your destination.",
      icon: "🎒",
      link: "/packing",
    },
    {
      title: "Weather Insights",
      desc: "Plan around real-time weather forecasts.",
      icon: "☀️",
      link: "/weather",
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <h2>Why Choose AI Trip Planner?</h2>
      <div className={styles.featuresGrid}>
        {features.map((f, i) => (
          <div
            key={i}
            className={styles.featureCard}
            onClick={() => router.push(f.link)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.icon}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
