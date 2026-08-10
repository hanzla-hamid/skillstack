import { createFileRoute } from "@tanstack/react-router";
import CodeOfConductPage from "@/pages/legal/CodeOfConductPage";

export const Route = createFileRoute("/code-of-conduct")({
  head: () => ({
    meta: [
      { title: "Code of Conduct — SkillStack" },
      {
        name: "description",
        content: "Community standards expected from SkillStack students and staff.",
      },
      { property: "og:title", content: "Code of Conduct — SkillStack" },
      {
        property: "og:description",
        content: "Community standards expected from SkillStack students and staff.",
      },
      { property: "og:url", content: "/code-of-conduct" },
      { name: "twitter:title", content: "Code of Conduct — SkillStack" },
      {
        name: "twitter:description",
        content: "Community standards expected from SkillStack students and staff.",
      },
    ],
    links: [{ rel: "canonical", href: "/code-of-conduct" }],
  }),
  component: CodeOfConductPage,
});
