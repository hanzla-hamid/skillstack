import { createFileRoute } from "@tanstack/react-router";
import RefundPolicyPage from "@/pages/legal/RefundPolicyPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — SkillStack" },
      { name: "description", content: "SkillStack's fee, cancellation and refund policy." },
      { property: "og:title", content: "Refund Policy — SkillStack" },
      { property: "og:description", content: "SkillStack's fee, cancellation and refund policy." },
      { property: "og:url", content: "/refund-policy" },
      { name: "twitter:title", content: "Refund Policy — SkillStack" },
      { name: "twitter:description", content: "SkillStack's fee, cancellation and refund policy." },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
  component: RefundPolicyPage,
});
