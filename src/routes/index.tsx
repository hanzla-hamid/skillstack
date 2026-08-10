import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/HomePage";

// Relative URLs: the project has no fixed public domain yet, so crawlers
// resolve these against whatever host serves the page.
const SITE = "";
const TITLE = "SkillStack — Skills Institute in Rawalpindi | Learn to Earn";
const DESCRIPTION =
  "SkillStack is a premium hybrid institute in Rawalpindi & Islamabad. Learn web development, graphic design, digital marketing and e-commerce with live projects, mentors and job-ready portfolios.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "SkillStack, SkillStack Rawalpindi, skills institute Rawalpindi, web development course Islamabad, graphic design course Rawalpindi, digital marketing course Pakistan, e-commerce training",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${SITE}/#website`,
              name: "SkillStack",
              alternateName: [
                "SkillStack Pakistan",
                "SkillStack Institute",
                "SkillStack Rawalpindi",
              ],
              url: SITE,
              inLanguage: "en-PK",
              publisher: { "@id": `${SITE}/#organization` },
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE}/knowledge?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "EducationalOrganization",
              "@id": `${SITE}/#organization`,
              name: "SkillStack",
              url: SITE,
              logo: `${SITE}/favicon.svg`,
              email: "skillstack.pk.official@gmail.com",
              areaServed: ["Rawalpindi", "Islamabad", "Pakistan"],
              sameAs: [
                "https://www.facebook.com/profile.php?id=61591636781863",
                "https://www.instagram.com/skillstack.pk.official/",
                "https://x.com/Skillstackpk",
                "https://www.youtube.com/@Skillstack-h2x",
              ],
            },
            {
              "@type": "ItemList",
              name: "SkillStack Programs",
              itemListElement: [
                "Web Development",
                "Graphic Designing",
                "Digital Marketing",
                "E-Commerce",
              ].map((name, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name,
                url: `${SITE}/courses`,
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});
