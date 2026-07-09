import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "site",
        label: "Client Sites",
        path: "content/sites",
        format: "mdx",
        fields: [
          { type: "string", name: "name", label: "Business Name", isTitle: true, required: true },
          { type: "string", name: "slug", label: "URL Slug", required: true },
          { type: "string", name: "template", label: "Template ID", options: ["1-clean","2-cinematic","3-editorial","4-instagram","5-masonry","6-split","7-vertical","8-carousel","9-story-cards","10-brutalist"] },
          { type: "string", name: "domain", label: "Custom Domain" },
          {
            type: "object", name: "hero", label: "Hero Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "subheading", label: "Subheading" },
              { type: "image", name: "image", label: "Background Image" },
            ],
          },
          {
            type: "object", name: "about", label: "About Section",
            fields: [
              { type: "rich-text", name: "body", label: "About Text" },
            ],
          },
          {
            type: "object", name: "services", label: "Services",
            list: true,
            fields: [
              { type: "string", name: "name", label: "Service Name" },
              { type: "string", name: "description", label: "Description" },
              { type: "string", name: "price", label: "Price" },
            ],
          },
          {
            type: "object", name: "pricing", label: "Pricing Plans",
            list: true,
            fields: [
              { type: "string", name: "name", label: "Plan Name" },
              { type: "string", name: "price", label: "Price" },
              { type: "string", name: "features", label: "Features", list: true },
            ],
          },
          {
            type: "object", name: "cta", label: "Call to Action",
            fields: [
              { type: "string", name: "label", label: "Button Text" },
              { type: "string", name: "url", label: "Button URL" },
            ],
          },
          { type: "datetime", name: "publishedAt", label: "Published At" },
        ],
      },
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "string", name: "siteSlug", label: "Client Site Slug", required: true },
          { type: "image", name: "featuredImage", label: "Featured Image" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
          { type: "datetime", name: "publishedAt", label: "Published At" },
        ],
      },
    ],
  },
});
