import { getAllPosts } from '@/lib/posts';
import BlogPageClient from './BlogPageClient';

export default function BlogPage() {
  // Récupération des données côté serveur (Server Component)
  const allPosts = getAllPosts(); 

  // On renvoie un composant client en lui passant les posts en props
  return <BlogPageClient allPosts={allPosts} />;
}
