import { createFileRoute } from "@tanstack/react-router";
import KnowledgePage from "@/pages/KnowledgePage";

const title = "Knowledge Hub — Guides & Tutorials | SkillStack";
const description =
  "Free in-depth guides, tutorials and career articles written by SkillStack instructors.";

export const Route = createFileRoute("/knowledge/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/knowledge" },
    ],
    links: [{ rel: "canonical", href: "/knowledge" }],
  }),
  component: KnowledgePage,
});
