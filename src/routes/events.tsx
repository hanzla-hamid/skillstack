import { createFileRoute } from "@tanstack/react-router";
import EventsPage from "@/pages/EventsPage";

const title = "Events — Workshops & Meetups | SkillStack";
const description =
  "Upcoming SkillStack workshops, bootcamps, orientation days and industry talks.";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});
