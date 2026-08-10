import { createFileRoute } from "@tanstack/react-router";
import DownloadsPage from "@/pages/DownloadsPage";

const title = "Download Center — Free Resources | SkillStack";
const description =
  "Download SkillStack cheat sheets, templates, prospectuses and practice files for free.";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/downloads" },
    ],
    links: [{ rel: "canonical", href: "/downloads" }],
  }),
  component: DownloadsPage,
});
