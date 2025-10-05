import React, { useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );

      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>☀️ Weather Insights</h1>
      <p style={styles.text}>Enter a city name to see the current weather.</p>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="e.g. Paris"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchWeather} style={styles.button}>
          {loading ? "Loading..." : "Check Weather"}
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: 20 }}>{error}</p>}

      {weather && (
        <div style={styles.card}>
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p style={styles.temp}>{Math.round(weather.main.temp)}°C</p>
          <p style={styles.desc}>{weather.weather[0].description}</p>
          <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "60px 20px",
    textAlign: "center",
    backgroundColor: "#f8fbff",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2.4rem",
    marginBottom: 10,
  },
  text: {
    color: "#555",
    marginBottom: 30,
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
  },
  input: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "220px",
  },
  button: {
    padding: "10px 18px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#0070f3",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
  },
  card: {
    background: "white",
    maxWidth: 400,
    margin: "0 auto",
    borderRadius: 12,
    padding: 30,
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  temp: {
    fontSize: "2.4rem",
    margin: "10px 0",
  },
  desc: {
    textTransform: "capitalize",
    fontSize: "1.2rem",
    color: "#333",
  },
};
