import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "@/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SkillStack" },
      {
        name: "description",
        content: "Get in touch with the SkillStack admissions and support team.",
      },
      { property: "og:title", content: "Contact — SkillStack" },
      {
        property: "og:description",
        content: "Get in touch with the SkillStack admissions and support team.",
      },
      { property: "og:url", content: "/contact" },
      { name: "twitter:title", content: "Contact — SkillStack" },
      {
        name: "twitter:description",
        content: "Get in touch with the SkillStack admissions and support team.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});
