import { createFileRoute } from "@tanstack/react-router";
import BlogPage from "@/pages/BlogPage";

const title = "Blog — Videos, Articles & Updates | SkillStack";
const description =
  "Watch SkillStack videos and read articles and updates, synced automatically from our YouTube channel and social pages.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});
