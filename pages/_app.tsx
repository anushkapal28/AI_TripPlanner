// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 12 }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
