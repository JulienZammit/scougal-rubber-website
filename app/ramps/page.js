import RampsClient from "./RampsClient";

export const metadata = {
  title: "Archived: Scougal Ramps (Discontinued Product)",
  description:
    "This page is archived. Scougal Ramps are no longer offered.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "Archived: Scougal Ramps (Discontinued)",
    description: "Scougal Ramps are no longer available.",
    url: "https://www.scougalrubber.com/ramps",
    type: "website",
    images: [
      {
        url: "https://www.scougalrubber.com/logo/logo-grey.ico",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: { canonical: "https://www.scougalrubber.com/ramps" },
  icons: { icon: "https://www.scougalrubber.com/logo/logo-grey.ico" },
};

// Minimal structured data indicating archival (no Product rich result)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Archived: Scougal Ramps",
  description: "Archived page for a discontinued product.",
  url: "https://www.scougalrubber.com/ramps",
  isPartOf: {
    "@type": "WebSite",
    name: "Scougal Rubber Corporation",
    url: "https://www.scougalrubber.com"
  }
};

export default function Ramps() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-6">Scougal Ramps (Discontinued)</h1>
        <p className="text-slate-600 mb-4">This product line has been retired and is no longer available for purchase.</p>
        <p className="text-slate-600 mb-8">For current solutions please explore our other offerings or contact us for assistance.</p>
        <a href="/" className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-500 transition">Return to Home</a>
      </div>
    </>
  );
}
