import BehindTheProcessClient from "./BehindTheProcessClient";

export const metadata = {
    title: "Behind the Process - Scougal Rubber University | Scougal Rubber",
    description:
        "Go behind the scenes at Scougal Rubber. See the real people, machines, and processes that mix, mold, cure and inspect the rubber components that support critical infrastructure across North America.",
    keywords:
        "Scougal Rubber process, rubber manufacturing, elastomeric bearings production, mixing a batch, rubber molding, Scougal Rubber University, behind the process",
    robots: "index, follow",
    author: "Scougal Rubber Corporation",
    openGraph: {
        title: "Behind the Process - Scougal Rubber University | Scougal Rubber",
        description:
            "Experience the human side of rubber manufacturing: batch mixing, molding, curing, inspection and shipping at Scougal Rubber.",
        url: "https://www.scougalrubber.com/behind-the-process",
        type: "website",
        images: [
            {
                url: "https://www.scougalrubber.com/logo/logo-grey.ico",
                alt: "Scougal Rubber University",
            },
        ],
    },
    alternates: {
        canonical: "https://www.scougalrubber.com/behind-the-process",
    },
    icons: {
        icon: "https://www.scougalrubber.com/logo/logo-grey.ico",
    },
    other: {
        "contact:email": "info@scougalrubber.com",
        "contact:phone_number": "+1 (775) 284-8500",
    },
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: "Behind the Process - Scougal Rubber University",
    description:
        "Educational behind‑the‑scenes content showcasing Scougal Rubber's manufacturing process: mixing, molding, curing, inspection, and shipping.",
    creator: {
        "@type": "Organization",
        name: "Scougal Rubber Corporation",
        url: "https://www.scougalrubber.com",
    },
    url: "https://www.scougalrubber.com/behind-the-process",
    about: [
        "rubber mixing",
        "industrial manufacturing",
        "elastomeric bearings",
        "quality assurance",
    ],
    learningResourceType: "ProcessOverview",
};

export default function BehindTheProcess() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <BehindTheProcessClient />
        </>
    );
}
