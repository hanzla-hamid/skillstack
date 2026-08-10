import { createFileRoute } from "@tanstack/react-router";
import FAQPage from "@/pages/FAQPage";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — SkillStack" },
      {
        name: "description",
        content:
          "Answers to the most common questions about SkillStack courses, fees and admissions.",
      },
      { property: "og:title", content: "FAQ — SkillStack" },
      {
        property: "og:description",
        content:
          "Answers to the most common questions about SkillStack courses, fees and admissions.",
      },
      { property: "og:url", content: "/faq" },
      { name: "twitter:title", content: "FAQ — SkillStack" },
      {
        name: "twitter:description",
        content:
          "Answers to the most common questions about SkillStack courses, fees and admissions.",
      },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});
