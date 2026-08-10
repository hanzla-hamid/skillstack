import { createFileRoute } from "@tanstack/react-router";
import AdmissionsPage from "@/pages/AdmissionsPage";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Apply to SkillStack" },
      {
        name: "description",
        content:
          "Apply for admission, request a scholarship, or send a course inquiry to SkillStack in Rawalpindi.",
      },
      { property: "og:title", content: "Admissions — Apply to SkillStack" },
      {
        property: "og:description",
        content:
          "Apply for admission, request a scholarship, or send a course inquiry to SkillStack in Rawalpindi.",
      },
      { property: "og:url", content: "/admissions" },
      { name: "twitter:title", content: "Admissions — Apply to SkillStack" },
      {
        name: "twitter:description",
        content:
          "Apply for admission, request a scholarship, or send a course inquiry to SkillStack in Rawalpindi.",
      },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: AdmissionsPage,
});
