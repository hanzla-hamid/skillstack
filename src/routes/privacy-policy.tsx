import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SkillStack" },
      {
        name: "description",
        content: "How SkillStack collects, uses and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — SkillStack" },
      {
        property: "og:description",
        content: "How SkillStack collects, uses and protects your personal information.",
      },
      { property: "og:url", content: "/privacy-policy" },
      { name: "twitter:title", content: "Privacy Policy — SkillStack" },
      {
        name: "twitter:description",
        content: "How SkillStack collects, uses and protects your personal information.",
      },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});
