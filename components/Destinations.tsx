import React, { useState } from "react";
import styles from "../styles/components/Destinations.module.css";

const Destinations = () => {
  const [selected, setSelected] = useState<any>(null);

  const places = [
    {
      name: "Paris",
      img: "/images/paris.jpg",
      description: "The city of love, known for Eiffel Tower, art museums, and romantic vibes.",
      highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"]
    },
    {
      name: "Tokyo",
      img: "/images/tokyo.jpg",
      description: "A vibrant city mixing tradition with futuristic tech, neon lights, and sushi.",
      highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tsukiji Market"]
    },
    {
      name: "Bali",
      img: "/images/bali.jpg",
      description: "Tropical paradise with beaches, rice terraces, temples, and surf spots.",
      highlights: ["Ubud", "Seminyak Beach", "Tanah Lot Temple"]
    },
    {
      name: "New York",
      img: "/images/newyork.jpg",
      description: "The city that never sleeps, iconic skyline, Broadway shows, and shopping.",
      highlights: ["Statue of Liberty", "Central Park", "Times Square"]
    },
  ];

  return (
    <section className={styles.destinationsSection}>
      <h2>Popular Destinations</h2>
      <div className={styles.destinationsGrid}>
        {places.map((p, i) => (
          <div
            className={styles.destinationCard}
            key={i}
            onClick={() => setSelected(p)}
          >
            <img src={p.img} alt={p.name} />
            <div className={styles.overlay}>
              <h3>{p.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selected && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelected(null)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setSelected(null)}
            >
              ✖
            </button>
            <img src={selected.img} alt={selected.name} />
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
            <h4>Highlights:</h4>
            <ul>
              {selected.highlights.map((h: string, i: number) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Destinations;
