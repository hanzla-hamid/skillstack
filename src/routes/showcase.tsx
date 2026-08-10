import { createFileRoute } from "@tanstack/react-router";
import ShowcasePage from "@/pages/ShowcasePage";

const title = "Student Showcase — Projects | SkillStack";
const description = "Real projects built and shipped by SkillStack students across every program.";

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/showcase" },
    ],
    links: [{ rel: "canonical", href: "/showcase" }],
  }),
  component: ShowcasePage,
});
