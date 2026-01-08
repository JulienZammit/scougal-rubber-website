import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts() {
  // 1. Lire tous les fichiers .md du dossier posts
  const fileNames = fs.readdirSync(postsDirectory);

  // 2. Récupérer les données de chaque fichier
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Utilisation de gray-matter pour extraire le front matter
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...data,
      content,
    };
  });

  // 3. On peut trier par date si besoin (facultatif)
  return allPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  // Validate slug to prevent path traversal
  if (typeof slug !== 'string' || slug.includes('..') || slug.includes('/') || slug.includes('\\')) {
    throw new Error('Invalid slug: path traversal attempt detected');
  }
  const normalizedPath = path.normalize(path.join(postsDirectory, slug + '.md'));
  if (!normalizedPath.startsWith(postsDirectory)) {
    throw new Error('Invalid path: path traversal attempt detected');
  }
  const fullPath = normalizedPath;
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...data,
    content,
  };
}
