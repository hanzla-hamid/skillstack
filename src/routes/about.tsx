import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "@/pages/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — SkillStack" },
      {
        name: "description",
        content:
          "Meet the team behind SkillStack and the mission driving our Rawalpindi learning institute.",
      },
      { property: "og:title", content: "About Us — SkillStack" },
      {
        property: "og:description",
        content:
          "Meet the team behind SkillStack and the mission driving our Rawalpindi learning institute.",
      },
      { property: "og:url", content: "/about" },
      { name: "twitter:title", content: "About Us — SkillStack" },
      {
        name: "twitter:description",
        content:
          "Meet the team behind SkillStack and the mission driving our Rawalpindi learning institute.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});
