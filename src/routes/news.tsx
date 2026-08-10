import { createFileRoute } from "@tanstack/react-router";
import NewsPage from "@/pages/NewsPage";

const title = "News Center — Announcements | SkillStack";
const description =
  "Admissions updates, partnerships, results and milestones from SkillStack academy.";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});
