import { createFileRoute } from "@tanstack/react-router";
import CoursesPage from "@/pages/CoursesPage";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Courses — SkillStack" },
      {
        name: "description",
        content:
          "Explore SkillStack's project-based courses in web development, design, marketing and e-commerce.",
      },
      { property: "og:title", content: "Courses — SkillStack" },
      {
        property: "og:description",
        content:
          "Explore SkillStack's project-based courses in web development, design, marketing and e-commerce.",
      },
      { property: "og:url", content: "/courses" },
      { name: "twitter:title", content: "Courses — SkillStack" },
      {
        name: "twitter:description",
        content:
          "Explore SkillStack's project-based courses in web development, design, marketing and e-commerce.",
      },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});
