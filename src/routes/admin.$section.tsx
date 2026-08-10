import { createFileRoute } from "@tanstack/react-router";
import AdminPage from "@/pages/AdminPage";

export const Route = createFileRoute("/admin/$section")({
  head: () => ({
    meta: [
      { title: "Admin Panel — SkillStack" },
      { name: "description", content: "SkillStack administration panel." },
      { property: "og:title", content: "Admin Panel — SkillStack" },
      { property: "og:description", content: "SkillStack administration panel." },
      { name: "twitter:title", content: "Admin Panel — SkillStack" },
      { name: "twitter:description", content: "SkillStack administration panel." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});
