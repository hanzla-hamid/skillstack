import { createFileRoute } from "@tanstack/react-router";
import TermsPage from "@/pages/legal/TermsPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — SkillStack" },
      {
        name: "description",
        content: "The terms that govern the use of SkillStack services and courses.",
      },
      { property: "og:title", content: "Terms & Conditions — SkillStack" },
      {
        property: "og:description",
        content: "The terms that govern the use of SkillStack services and courses.",
      },
      { property: "og:url", content: "/terms" },
      { name: "twitter:title", content: "Terms & Conditions — SkillStack" },
      {
        name: "twitter:description",
        content: "The terms that govern the use of SkillStack services and courses.",
      },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});
