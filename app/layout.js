import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "America's Custom Molded Rubber Company",
  description: "Leading provider of custom molded rubber solutions since 1916.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scougalrubber.com/",
    site_name: "America's Custom Molded Rubber Company",
  },
  additionalMetaTags: [
    {
      property: "keywords",
      content:
        "custom molded, rubber company, industrial rubber, rubber manufacturing",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Scougal Rubber is a company that manufactures custom molded rubber products since 1916." />
        <meta name="keywords" content="rubber, molded rubber, custom rubber products" />
        <meta name="author" content="Scougal Rubber" />
      </head>
      <body className={inter.className}>
        <Header className="top-2"/>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
