// /pages/itinerary.tsx
import React, { useState } from "react";

export default function ItineraryPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [travelType, setTravelType] = useState("Leisure");
  const [budget, setBudget] = useState("Moderate");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setItinerary("");

    try {
      const res = await fetch("/api/generateItinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days, travelType, budget }),
      });

      const data = await res.json();
      if (res.ok) setItinerary(data.itinerary);
      else setError(data.error || "Failed to generate itinerary");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🧭 AI-Powered Itinerary Planner</h1>
      <p style={styles.subText}>
        Enter your travel details and get a personalized daily plan.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Destination</label>
          <input
            style={styles.input}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Tokyo"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Days</label>
          <input
            type="number"
            style={styles.input}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            min={1}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Travel Type</label>
          <select
            style={styles.input}
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
          >
            <option>Leisure</option>
            <option>Adventure</option>
            <option>Luxury</option>
            <option>Budget</option>
            <option>Cultural</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Budget</label>
          <select
            style={styles.input}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>
        </div>

        <button style={styles.button} disabled={loading}>
          {loading ? "Planning..." : "Generate Itinerary"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {itinerary && (
        <div style={styles.card}>
          <h3>📅 Suggested Itinerary</h3>
          <pre style={styles.itineraryText}>{itinerary}</pre>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "rgba(255,255,255,0.03)",
    padding: "60px 20px",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: { fontSize: "2.5rem", marginBottom: 10, color: "#2b2b2b" },
  subText: { color: "#555", marginBottom: 40 },
  form: { display: "flex", flexDirection: "column", alignItems: "center", gap: 20 },
  formGroup: { width: 300, textAlign: "left" },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    marginTop: 20,
    padding: "12px 25px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  card: {
    marginTop: 40,
    background: "white",
    color: "black",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: 600,
    marginInline: "auto",
    textAlign: "left",
  },
  itineraryText: { whiteSpace: "pre-wrap", lineHeight: 1.6, fontSize: "1rem", color: "#333" },
};
