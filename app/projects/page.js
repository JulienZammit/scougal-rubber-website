import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Our Projects - Scougal Rubber | Bridge & Industrial Rubber Solutions',
  description: 'Explore the key projects completed by Scougal Rubber, including bridge construction and industrial rubber solutions. Discover how our expertise has been applied in projects like the Bayway & Caloosahatchee Bridge, Hood Canal, and more.',
  keywords: 'Scougal Rubber projects, bridge construction projects, industrial rubber projects, elastomeric bearings projects, custom rubber solutions, Bayway Bridge, Hood Canal, Advanced American project, Lynn Lake project',
  robots: 'index, follow',
  author: 'Scougal Rubber Corporation',
  openGraph: {
    title: 'Our Projects - Scougal Rubber | Bridge & Industrial Rubber Solutions',
    description: "See how Scougal Rubber's expertise has been applied in various bridge and industrial projects. Explore our completed projects including Bayway & Caloosahatchee Bridge and Advanced American.",
    url: 'https://www.scougalrubber.com/projects',
    type: 'website',
    images: [
      {
        url: 'https://www.scougalrubber.com/images/projects-banner.jpg',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.scougalrubber.com/projects',
  },
  icons: {
    icon: '/favicon.ico',
  },
  // Métadonnées supplémentaires de contact
  other: {
    'contact:email': 'info@scougalrubber.com',
    'contact:phone_number': '+1 (775) 284-8500',
  },
};

export default function Projects() {
  
  return (
    <>
      <ProjectsClient />
    </>
  );
}
