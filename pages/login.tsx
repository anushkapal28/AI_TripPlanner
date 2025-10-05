import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/"); // redirect after login
      } else setError(data.error);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </label>
          <label style={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </label>
          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(180deg,#071026 0%, #071A2C 100%)",
    padding: "20px",
  },
  card: {
    background:"#d3d3d3",
    borderRadius: 12,
    padding: "40px 30px",
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
    textAlign: "center",
    
  },
  heading: {
    fontSize: "2rem",
    color: "#000000",
    marginBottom: 30,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    
  },
  label: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    color: "#000000",
    fontWeight: 500,
    fontSize: 14,
  },
  input: {
    marginTop: 6,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #000000",
    background: "transparent",
    color: "#000000",
    outline: "none",
    fontSize: "1rem",
  },
  button: {
    padding: "12px 0",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(90deg, #4CAF50, #43A047)",
    color: "#071026",
    fontWeight: 700,
    fontSize: "1rem",
    transition: "all 0.2s ease",
  },
  error: {
    marginTop: 15,
    color: "#FF6B6B",
    fontWeight: 500,
  },
};
