import { createFileRoute } from "@tanstack/react-router";
import LibraryPage from "@/pages/LibraryPage";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Learning Library — SkillStack" },
      {
        name: "description",
        content: "Free guides, resources and learning material from SkillStack.",
      },
      { property: "og:title", content: "Learning Library — SkillStack" },
      {
        property: "og:description",
        content: "Free guides, resources and learning material from SkillStack.",
      },
      { property: "og:url", content: "/library" },
      { name: "twitter:title", content: "Learning Library — SkillStack" },
      {
        name: "twitter:description",
        content: "Free guides, resources and learning material from SkillStack.",
      },
    ],
    links: [{ rel: "canonical", href: "/library" }],
  }),
  component: LibraryPage,
});
