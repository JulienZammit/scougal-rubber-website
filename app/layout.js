import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Scougal Rubber',
  description: 'Scougal Rubber - Custom Molded Rubber Products Since 1916',
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
