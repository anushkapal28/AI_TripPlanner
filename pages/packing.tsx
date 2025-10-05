import React, { useState } from "react";

export default function Packing() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(1);
  const [travelers, setTravelers] = useState(1);
  const [travelType, setTravelType] = useState("Casual");
  const [packingList, setPackingList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPackingList([]);

    try {
      const res = await fetch("/api/packing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days, travelers, travelType }),
      });

      const data = await res.json();

      if (res.ok) {
        const list = data.packingList
          .split(/\n|•|-/)
          .map((item: string) => item.trim())
          .filter(Boolean);
        setPackingList(list);
      } else {
        setError(data.error || "Failed to generate packing list");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎒 Packing Assistant</h1>
      <p style={styles.text}>Enter your trip details to get a personalized packing list.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <div style={styles.fieldHeading}>Destination</div>
          <input
            style={styles.input}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Paris"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <div style={styles.fieldHeading}>Number of Days</div>
          <input
            type="number"
            style={styles.input}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            min={1}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <div style={styles.fieldHeading}>Number of Travelers</div>
          <input
            type="number"
            style={styles.input}
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            min={1}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <div style={styles.fieldHeading}>Travel Type / Activities</div>
          <select
            style={styles.input}
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
          >
            <option value="Casual">Casual</option>
            <option value="Beach">Beach</option>
            <option value="Adventure">Adventure</option>
            <option value="Business">Business</option>
            <option value="Winter Sports">Winter Sports</option>
          </select>
        </div>

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Generating..." : "Get Packing List"}
        </button>
      </form>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {packingList.length > 0 && (
        <div style={styles.card}>
          <h3>Packing List</h3>
          <ul>
            {packingList.map((item, i) => (
              <li key={i} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "60px 20px",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: { fontSize: "2.5rem", marginBottom: 15, color: "#333" },
  text: { color: "#555", maxWidth: 700, margin: "0 auto 40px", fontSize: "1.1rem", lineHeight: 1.6 },
  form: { display: "flex", flexDirection: "column", alignItems: "center", gap: 20, marginBottom: 30 },
  formGroup: { display: "flex", flexDirection: "column", width: 300, textAlign: "left" },
  fieldHeading: { fontSize: 14, fontWeight: 600, color: "#333", marginBottom: 5 },
  input: { padding: "10px 15px", fontSize: "1rem", borderRadius: 8, border: "1px solid #ccc" },
  button: {
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  card: {
    background: "black",
    maxWidth: 500,
    margin: "0 auto",
    borderRadius: 12,
    padding: 30,
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  listItem: { marginBottom: 8, lineHeight: 1.5 },
};
