// pages/budget.tsx
import React, { useState } from "react";

interface BudgetData {
  flightCost: number;
  accommodationCost: number;
  foodCost: number;
  activitiesCost: number;
  total: number;
  visaDetail?: string;
}

interface RawResponse {
  rawResponse?: string;
  error?: string;
}

type BudgetResponse = BudgetData | RawResponse;

export default function BudgetPage() {
  const [from, setFrom] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(1);
  const [travelers, setTravelers] = useState(1);
  const [preference, setPreference] = useState("standard");
  const [budget, setBudget] = useState<BudgetResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Robust parser for currency strings
  const parseINR = (val: string | number) => {
    if (typeof val === "number") return val;
    const cleaned = String(val).replace(/[₹, ]/g, "");
    const num = Number(cleaned);
    return isNaN(num) ? 0 : num;
  };

  const normalizeBudget = (data: any): BudgetData => ({
    flightCost: parseINR(data.flightCost),
    accommodationCost: parseINR(data.accommodationCost),
    foodCost: parseINR(data.foodCost),
    activitiesCost: parseINR(data.activitiesCost),
    total: parseINR(data.total),
    visaDetail: data.visaDetail,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBudget(null);

    try {
      const res = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, destination, days, travelers, preference }),
      });

      const data: any = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Failed to fetch budget");
      } else {
        if ("flightCost" in data) {
          setBudget(normalizeBudget(data));
        } else {
          setBudget(data); // fallback to rawResponse
        }
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const isValidBudget = (b: BudgetResponse): b is BudgetData =>
    b && "flightCost" in b && typeof b.flightCost === "number";

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>💰 Smart Budgeting</h1>
      <p style={styles.text}>
        Plan your trip expenses efficiently. Enter your trip details below to get a dynamic budget.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <div style={styles.fieldHeading}>Current City</div>
          <input
            type="text"
            style={styles.input}
            placeholder="Enter your Current City"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <div style={styles.fieldHeading}>Destination City</div>
          <input
            type="text"
            style={styles.input}
            placeholder="Enter your Destination City"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <div style={styles.fieldHeading}>Number of Days</div>
          <input
            type="number"
            style={styles.input}
            placeholder="Days"
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
            placeholder="Travelers"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            min={1}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <div style={styles.fieldHeading}>Trip Preference</div>
          <select
            style={styles.input}
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          >
            <option value="budget">Budget</option>
            <option value="standard">Standard</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <button
          style={{
            ...styles.button,
            opacity: loading || !destination.trim() ? 0.6 : 1,
            cursor: loading || !destination.trim() ? "not-allowed" : "pointer",
          }}
          type="submit"
          disabled={loading || !destination.trim()}
        >
          {loading ? "Calculating..." : "Get Budget"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {budget && (
        <div style={styles.card}>
          <h3>Budget Breakdown</h3>
          {isValidBudget(budget) ? (
            <>
              <p>Flights: {formatCurrency(budget.flightCost)}</p>
              <p>Accommodation: {formatCurrency(budget.accommodationCost)}</p>
              <p>Activities: {formatCurrency(budget.activitiesCost)}</p>
              <p>Food: {formatCurrency(budget.foodCost)}</p>
              <h4>Total: {formatCurrency(budget.total)}</h4>
              {budget.visaDetail && (
                <p style={{ marginTop: 10, fontStyle: "italic" }}>{budget.visaDetail}</p>
              )}
            </>
          ) : (
            <pre>{budget.rawResponse}</pre>
          )}
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
    minHeight: "screen",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: { fontSize: "2.4rem", marginBottom: 20 },
  text: { color: "#ffffff", maxWidth: 700, margin: "0 auto 40px", fontSize: "1.1rem", lineHeight: 1.6 },
  form: { display: "flex", flexDirection: "column", alignItems: "center", gap: 15, marginBottom: 30 },
  input: { padding: "10px 15px", fontSize: "1rem", width: 250, borderRadius: 8, border: "1px solid #1f1919ff", outline: "none" },
  button: { padding: "10px 20px", fontSize: "1rem", borderRadius: 8, border: "none", backgroundColor: "#4CAF50", color: "white", transition: "all 0.2s ease" },
  card: { background: "white",color:"#000000", maxWidth: 500, margin: "0 auto", borderRadius: 12, padding: 30, boxShadow: "0 6px 15px rgba(0,0,0,0.1)", textAlign: "left" },
  fieldHeading: { fontSize: 16, fontWeight: 600, color: "#ffffff", marginBottom: 5 },
  formGroup: { display: "flex", flexDirection: "column", width: 300, textAlign: "left" },
  error: { color: "red", marginTop: 10 },
};
