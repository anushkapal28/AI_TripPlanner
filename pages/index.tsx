// pages/index.tsx
import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Destinations from "../components/Destinations";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import { GetServerSideProps } from 'next';

export default function Home() {
  return (
    <div className="main">
      {/* Hero Section */}
      <Hero />

      {/* How it Works Section */}
      <section className="container" style={{ marginTop: 30}}>
        <div className="card">
          <h2 className="h2">How it works</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 14,
              marginTop: 14,
            }}
          >
            <div style={{ padding: 12 }}>
              <h3 style={{ marginBottom: 8 }}>1. Tell AI your plans</h3>
              <p style={{ color: "var(--muted)" }}>
                Choose destination, days, preferences and let AI craft a plan.
              </p>
            </div>
            <div style={{ padding: 12 }}>
              <h3 style={{ marginBottom: 8 }}>2. Review & tweak</h3>
              <p style={{ color: "var(--muted)" }}>
                Adjust pace, budget, or attractions.
              </p>
            </div>
            <div style={{ padding: 12 }}>
              <h3 style={{ marginBottom: 8 }}>3. Save & share</h3>
              <p style={{ color: "var(--muted)" }}>
                Save trip and share with friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 👇 New Sections Added Below */}
      <Features />
      <Destinations />
      <Testimonials />
      <CTA />
    </div>
  );
}
