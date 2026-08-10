import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "@/pages/DashboardPage";

export const Route = createFileRoute("/dashboard/$section")({
  head: () => ({
    meta: [
      { title: "Dashboard — SkillStack" },
      { name: "description", content: "Your SkillStack learning dashboard." },
      { property: "og:title", content: "Dashboard — SkillStack" },
      { property: "og:description", content: "Your SkillStack learning dashboard." },
      { name: "twitter:title", content: "Dashboard — SkillStack" },
      { name: "twitter:description", content: "Your SkillStack learning dashboard." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DashboardPage,
});
