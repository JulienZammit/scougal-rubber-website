import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "meta", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().min(10).max(120),
      description: "The main headline. Aim for 50-70 characters for SEO.",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: "Auto-generated from the title. Click 'Generate' if needed.",
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().min(50).max(200),
      description:
        "Shown on the blog listing and used as default meta description. 150-160 characters recommended.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "Main image for the article (used for previews and social sharing).",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Bridge Bearings", value: "Bridge Bearings" },
          { title: "Industrial Rubber", value: "Industrial Rubber" },
          { title: "Manufacturing", value: "Manufacturing" },
          { title: "Quality & Compliance", value: "Quality & Compliance" },
          { title: "Company News", value: "Company News" },
          { title: "Technical Insights", value: "Technical Insights" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading time (minutes)",
      type: "number",
      group: "meta",
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: "authorRef",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      description:
        "Pick the author from the team. To add a new team member, create an Author document first.",
    }),
    defineField({
      name: "author",
      title: "Author (legacy embedded — leave empty for new posts)",
      type: "object",
      group: "meta",
      hidden: ({ document }) => !document?.author?.name,
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "title", type: "string", title: "Job title" },
        {
          name: "avatar",
          type: "image",
          title: "Avatar",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "content",
      title: "Article body",
      type: "blockContent",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Meta title (SEO)",
      type: "string",
      group: "seo",
      description:
        "Optional. Falls back to the article title. Aim for 50-60 characters.",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description (SEO)",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Optional. Falls back to the short description. Aim for 150-160 characters.",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "ogImage",
      title: "Social preview image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      description:
        "Optional. Used when the article is shared on social media. Falls back to cover image.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Draft (not visible publicly)", value: "draft" },
          { title: "Published (live on website)", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),
  ],
  preview: {
    select: {
      title: "title",
      authorName: "authorRef.name",
      legacyAuthor: "author.name",
      media: "coverImage",
      status: "status",
      date: "date",
    },
    prepare({ title, authorName, legacyAuthor, media, status, date }) {
      const author = authorName || legacyAuthor;
      const subtitle = [
        status === "published" ? "✅ Published" : "📝 Draft",
        author ? `by ${author}` : null,
        date ? new Date(date).toLocaleDateString() : null,
      ]
        .filter(Boolean)
        .join(" · ");
      return { title, subtitle, media };
    },
  },
  orderings: [
    {
      title: "Publish date (newest)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Publish date (oldest)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
