import { createFileRoute } from "@tanstack/react-router";
import GalleryPage from "@/pages/GalleryPage";

const title = "Gallery — Life at SkillStack";
const description =
  "Photos from SkillStack classrooms, workshops, graduations and community events.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});
