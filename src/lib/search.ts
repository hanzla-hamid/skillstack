import { PROGRAMS } from "@/lib/constants";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  group: "Pages" | "Courses";
}

const STATIC_PAGES: SearchResult[] = [
  { id: "page-home", title: "Home", description: "SkillStack homepage", href: "/", group: "Pages" },
  {
    id: "page-courses",
    title: "Courses",
    description: "Browse all courses and programs",
    href: "/courses",
    group: "Pages",
  },
  {
    id: "page-library",
    title: "Library",
    description: "Learning resources library",
    href: "/library",
    group: "Pages",
  },
  {
    id: "page-knowledge",
    title: "Knowledge Hub",
    description: "Guides, tutorials and career articles",
    href: "/knowledge",
    group: "Pages",
  },
  {
    id: "page-blog",
    title: "Blog",
    description: "Videos, articles and updates from SkillStack",
    href: "/blog",
    group: "Pages",
  },
  {
    id: "page-news",
    title: "News Center",
    description: "Announcements and updates from SkillStack",
    href: "/news",
    group: "Pages",
  },
  {
    id: "page-gallery",
    title: "Gallery",
    description: "Photos from campus life and events",
    href: "/gallery",
    group: "Pages",
  },
  {
    id: "page-showcase",
    title: "Student Showcase",
    description: "Projects built by SkillStack students",
    href: "/showcase",
    group: "Pages",
  },
  {
    id: "page-events",
    title: "Events",
    description: "Workshops, bootcamps and meetups",
    href: "/events",
    group: "Pages",
  },
  {
    id: "page-downloads",
    title: "Download Center",
    description: "Free cheat sheets, templates and prospectus",
    href: "/downloads",
    group: "Pages",
  },
  {
    id: "page-about",
    title: "About",
    description: "About SkillStack academy",
    href: "/about",
    group: "Pages",
  },
  {
    id: "page-contact",
    title: "Contact",
    description: "Get in touch with admissions",
    href: "/contact",
    group: "Pages",
  },
  {
    id: "page-faq",
    title: "FAQ",
    description: "Frequently asked questions",
    href: "/faq",
    group: "Pages",
  },
  {
    id: "page-login",
    title: "Login",
    description: "Sign in to your account",
    href: "/login",
    group: "Pages",
  },
  {
    id: "page-register",
    title: "Register",
    description: "Create a new account",
    href: "/register",
    group: "Pages",
  },
  {
    id: "page-dashboard",
    title: "Dashboard",
    description: "Your learning dashboard",
    href: "/dashboard",
    group: "Pages",
  },
  {
    id: "page-privacy",
    title: "Privacy Policy",
    description: "How we handle your data",
    href: "/privacy-policy",
    group: "Pages",
  },
  {
    id: "page-terms",
    title: "Terms & Conditions",
    description: "Terms of service",
    href: "/terms",
    group: "Pages",
  },
  {
    id: "page-refund",
    title: "Refund Policy",
    description: "Refund and cancellation policy",
    href: "/refund-policy",
    group: "Pages",
  },
  {
    id: "page-conduct",
    title: "Code of Conduct",
    description: "Community code of conduct",
    href: "/code-of-conduct",
    group: "Pages",
  },
];

export function searchSite(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const pageResults = STATIC_PAGES.filter(
    (page) =>
      page.title.toLowerCase().includes(normalized) ||
      page.description.toLowerCase().includes(normalized),
  );

  const courseResults: SearchResult[] = PROGRAMS.filter(
    (program) =>
      program.title.toLowerCase().includes(normalized) ||
      program.description.toLowerCase().includes(normalized),
  ).map((program) => ({
    id: `course-${program.slug ?? program.title}`,
    title: program.title,
    description: program.description,
    href: program.slug ? `/courses/${program.slug}` : "/courses",
    group: "Courses",
  }));

  return [...pageResults, ...courseResults];
}
