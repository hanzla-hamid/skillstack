import { createFileRoute } from "@tanstack/react-router";
import RegisterPage from "@/pages/RegisterPage";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — SkillStack" },
      { name: "description", content: "Create your SkillStack account and start learning." },
      { property: "og:title", content: "Create Account — SkillStack" },
      { property: "og:description", content: "Create your SkillStack account and start learning." },
      { property: "og:url", content: "/register" },
      { name: "twitter:title", content: "Create Account — SkillStack" },
      {
        name: "twitter:description",
        content: "Create your SkillStack account and start learning.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RegisterPage,
});
