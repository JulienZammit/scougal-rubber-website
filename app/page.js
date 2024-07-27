import Head from 'next/head';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div>
      <Head>
        <title>America's Custom Molded Rubber Company</title>
        <meta name="description" content="Leading provider of custom molded rubber solutions since 1916. Discover our products and services." />
        <meta name="keywords" content="custom molded, rubber company, industrial rubber, rubber manufacturing" />
        <meta property="og:title" content="America's Custom Molded Rubber Company" />
        <meta property="og:description" content="Leading provider of custom molded rubber solutions since 1916. Discover our products and services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scougalrubber.com/" />
        <meta property="og:image" content="https://scougalrubber.com/logo.gif" />
        <link rel="canonical" href="https://scougalrubber.com/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </div>
  );
}
