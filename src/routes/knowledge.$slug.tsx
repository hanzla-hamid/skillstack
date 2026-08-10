import { createFileRoute } from "@tanstack/react-router";
import ArticlePage from "@/pages/ArticlePage";

export const Route = createFileRoute("/knowledge/$slug")({
  head: ({ params }) => {
    const title = "Article — SkillStack Knowledge Hub";
    const description = "Read this guide from the SkillStack Knowledge Hub.";
    const url = `/knowledge/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ArticlePage,
});
