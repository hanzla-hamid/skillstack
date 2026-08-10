import { createFileRoute } from "@tanstack/react-router";
import CourseDetailPage from "@/pages/CourseDetailPage";

export const Route = createFileRoute("/courses/$slug")({
  head: () => ({
    meta: [
      { title: "Course Details — SkillStack" },
      {
        name: "description",
        content: "Full curriculum, outcomes and schedule for this SkillStack program.",
      },
      { property: "og:title", content: "Course Details — SkillStack" },
      {
        property: "og:description",
        content: "Full curriculum, outcomes and schedule for this SkillStack program.",
      },
      { name: "twitter:title", content: "Course Details — SkillStack" },
      {
        name: "twitter:description",
        content: "Full curriculum, outcomes and schedule for this SkillStack program.",
      },
    ],
  }),
  component: CourseDetailPage,
});
