// pages/create-trip.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";

type Form = {
  destination: string;
  days: number;
  travelStyle: string;
  interests: string;
};

export default function CreateTrip() {
  const [form, setForm] = useState<Form>({
    destination: "Paris",
    days: 4,
    travelStyle: "Relaxed",
    interests: "museums, food",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<string | null>(null);
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: form.destination,
          days: form.days,
          travelType: `${form.travelStyle}, ${form.interests}`,
          budget: "Flexible", // or you can add a budget input
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate itinerary");
      } else {
        setItinerary(data.itinerary);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) router.push(`/trips/${data._id}`);
      else throw new Error(data.error || "Save failed");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container" style={{ paddingTop: 24 }}>
      <h2 className="h1">Create & Generate Trip</h2>
      <div style={{ marginTop: 18 }} className="card">
        <form onSubmit={handleGenerate} style={{ display: "grid", gap: 12 }}>
          {/* Destination */}
          <label>
            Destination
            <input
              required
              value={form.destination}
              onChange={(e) =>
                setForm((s) => ({ ...s, destination: e.target.value }))
              }
              style={{
                width: "100%",
                marginTop: 6,
                padding: 10,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.04)",
                background: "transparent",
                color: "inherit",
              }}
            />
          </label>

          {/* Days + Travel Style */}
          <div style={{ display: "flex", gap: 12 }}>
            <label style={{ flex: 1 }}>
              Days
              <input
                type="number"
                value={form.days}
                min={1}
                onChange={(e) =>
                  setForm((s) => ({ ...s, days: Number(e.target.value) }))
                }
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.04)",
                  background: "transparent",
                  color: "inherit",
                }}
              />
            </label>

            <label style={{ flex: 2 }}>
              Travel style
              <select
                value={form.travelStyle}
                onChange={(e) =>
                  setForm((s) => ({ ...s, travelStyle: e.target.value }))
                }
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.04)",
                  background: "transparent",
                  color: "inherit",
                }}
              >
                <option>Relaxed</option>
                <option>Adventure</option>
                <option>Fast paced</option>
              </select>
            </label>
          </div>

          {/* Interests */}
          <label>
            Interests (comma separated)
            <input
              value={form.interests}
              onChange={(e) =>
                setForm((s) => ({ ...s, interests: e.target.value }))
              }
              style={{
                width: "100%",
                marginTop: 6,
                padding: 10,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.04)",
                background: "transparent",
                color: "inherit",
              }}
            />
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="card"
            style={{
              cursor: "pointer",
              border: "none",
              background: "linear-gradient(90deg,var(--accent),var(--accent-2))",
              color: "#071026",
              fontWeight: 700,
              padding: "10px 16px",
              borderRadius: 10,
            }}
          >
            {loading ? "Generating..." : "Generate itinerary"}
          </button>

          {error && <div style={{ color: "tomato" }}>{error}</div>}
        </form>

        {/* Save Draft */}
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="card"
            style={{
              background: "transparent",
              color: "var(--muted)",
              border: "1px solid rgba(255,255,255,0.03)",
              padding: "10px 16px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Save draft
          </button>
        </div>

        {/* Display itinerary */}
        {itinerary && (
          <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
            <h3>Your Generated Itinerary</h3>
            <p>{itinerary}</p>
          </div>
        )}
      </div>
    </section>
  );
}
