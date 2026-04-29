import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId, isConfigured } from "../sanity/env";

export const sanityClient = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source) {
  if (!builder) {
    return { url: () => "", width: () => ({ url: () => "" }) };
  }
  return builder.image(source);
}

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  category,
  date,
  readingTime,
  "author": coalesce(
    authorRef->{
      "name": name,
      "title": jobTitle,
      "avatar": avatar.asset->url,
      "bio": bio
    },
    {
      "name": author.name,
      "title": author.title,
      "avatar": author.avatar.asset->url
    }
  ),
  metaTitle,
  metaDescription,
  "ogImage": ogImage.asset->url,
  status
`;

export async function getAllPosts() {
  if (!sanityClient) return [];
  const query = `*[_type == "post" && status == "published"] | order(date desc) {
    ${POST_FIELDS}
  }`;
  return await sanityClient.fetch(query, {}, { next: { revalidate: 60 } });
}

export async function getPostBySlug(slug) {
  if (!sanityClient) return null;
  const query = `*[_type == "post" && slug.current == $slug && status == "published"][0] {
    ${POST_FIELDS},
    content
  }`;
  return await sanityClient.fetch(query, { slug }, { next: { revalidate: 60 } });
}

export async function getAllPostSlugs() {
  if (!sanityClient) return [];
  const query = `*[_type == "post" && status == "published"].slug.current`;
  return await sanityClient.fetch(query, {}, { next: { revalidate: 60 } });
}
