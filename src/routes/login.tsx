import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/pages/LoginPage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — SkillStack" },
      { name: "description", content: "Sign in to your SkillStack student dashboard." },
      { property: "og:title", content: "Sign In — SkillStack" },
      { property: "og:description", content: "Sign in to your SkillStack student dashboard." },
      { property: "og:url", content: "/login" },
      { name: "twitter:title", content: "Sign In — SkillStack" },
      { name: "twitter:description", content: "Sign in to your SkillStack student dashboard." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});
