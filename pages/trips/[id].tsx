import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TripDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/trips`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((t: any) => t._id === id);
        setTrip(found);
      });
  }, [id]);

  if (!trip) return <p>Loading trip...</p>;

  return (
    <section className="container" style={{ paddingTop: 24 }}>
      <h2 className="h1">{trip.destination} Trip</h2>
      <p><b>Days:</b> {trip.days}</p>
      <p><b>Style:</b> {trip.travelStyle}</p>
      <p><b>Interests:</b> {trip.interests}</p>

      {trip.generated && (
        <>
          <h3>AI Itinerary</h3>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#111', padding: 12 }}>
            {JSON.stringify(trip.generated, null, 2)}
          </pre>
        </>
      )}

      <button
        onClick={() => navigator.clipboard.writeText(window.location.href)}
        style={{
          marginTop: 12,
          padding: '8px 16px',
          borderRadius: 8,
          cursor: 'pointer',
          background: 'linear-gradient(90deg,var(--accent),var(--accent-2))',
          color: '#071026',
          fontWeight: 600
        }}
      >
        Copy Share Link 📋
      </button>
    </section>
  );
}
