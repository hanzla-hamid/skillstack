import type { Article } from "./content";

/**
 * Editorial articles shipped with the site. Used to fill the Knowledge Hub when
 * the database has no published articles yet (purely presentational content).
 */
export const SEED_ARTICLES: Article[] = [
  {
    id: "seed-web-dev-roadmap",
    slug: "web-development-roadmap-2026",
    title: "The 2026 Web Development Roadmap for Beginners in Pakistan",
    excerpt:
      "A realistic, month-by-month path from your first HTML page to a deployed full-stack project — written for students starting from zero.",
    content: `Most beginners fail not because web development is hard, but because the roadmap they follow is built for someone else. Here is the path we actually teach at SkillStack.

## Months 1-2: The foundation
Start with HTML and CSS only. Build five small pages by hand — a profile card, a pricing table, a restaurant menu, a landing page, and a simple blog layout. Do not use a framework. The goal is to understand the box model, flexbox, and responsive breakpoints well enough that you can guess how a layout behaves before you refresh the browser.

## Month 3: JavaScript that sticks
Learn variables, arrays, objects, functions, and the DOM. Then rebuild two of your earlier pages with interactivity: a filterable list and a form with validation. Avoid tutorials longer than 20 minutes; write code instead.

## Months 4-5: React and real projects
Once plain JavaScript feels comfortable, move to React. Components, props, state, and data fetching cover 90% of what junior roles require. Build a project you would actually use — an expense tracker, a course catalogue, a portfolio with a CMS.

## Month 6: Ship and get seen
Deploy everything. A live URL is worth more than ten repositories nobody can open. Write a short case study for each project: the problem, your approach, and one thing you would change.

## What to skip for now
TypeScript generics, micro-frontends, Kubernetes, and premature optimisation. They are real skills, but none of them get you your first client or your first interview.

Consistency beats intensity. Two focused hours a day for six months will outperform any weekend marathon.`,
    category: "Web Development",
    cover_image: "/images/articles/web-development.jpg",
    author: "SkillStack Faculty",
    read_minutes: 7,
    tags: ["web development", "roadmap", "beginners", "react"],
    featured: true,
    published: true,
    published_at: "2026-07-14T09:00:00.000Z",
  },
  {
    id: "seed-design-portfolio",
    slug: "graphic-design-portfolio-that-gets-hired",
    title: "Building a Graphic Design Portfolio That Actually Gets You Hired",
    excerpt:
      "Six strong pieces beat sixty average ones. How to choose, present and explain the work that convinces a client to pay you.",
    content: `Clients do not hire designers for their software skills. They hire for judgement — and a portfolio is the only proof of judgement you can show before you are trusted with a brief.

## Six pieces, not sixty
Pick six projects that show range: a logo and identity, a social campaign, a packaging or print piece, a poster, a UI screen, and one self-initiated experiment. Anything weaker than your best work drags your average down.

## Show the thinking, not just the pixels
For each project write three short lines: the brief, the constraint, and the decision. "The client needed the logo to work at 16px on a delivery app, so the mark was simplified to a single stroke." That sentence sells you better than any mockup.

## Presentation is part of the work
Use consistent mockups, one background treatment, and the same crop ratio throughout. A portfolio that looks designed proves you can design.

## Invent the briefs you want
If you have no clients yet, redesign real local businesses — a bakery in Saddar, a clinic, a clothing brand. Real constraints produce real work, and business owners often say yes when they see unsolicited concepts.

## Keep it alive
Replace your weakest piece every two months. A portfolio is not an archive; it is an argument that you are good right now.`,
    category: "Graphic Design",
    cover_image: "/images/articles/design-career.jpg",
    author: "SkillStack Faculty",
    read_minutes: 6,
    tags: ["graphic design", "portfolio", "career", "freelancing"],
    featured: false,
    published: true,
    published_at: "2026-07-28T09:00:00.000Z",
  },
  {
    id: "seed-freelancing-first-client",
    slug: "landing-your-first-freelance-client",
    title: "Landing Your First Freelance Client Without a Single Review",
    excerpt:
      "The chicken-and-egg problem of freelancing, solved: how new SkillStack graduates win their first paid project in 30 days.",
    content: `Every marketplace rewards people who already have reviews. Here is how our students break that loop.

## Start narrow
"I build websites" attracts nobody. "I build one-page booking sites for salons and clinics" attracts exactly the person who needs it. A narrow offer is easier to explain, easier to price, and easier to refer.

## Sell an outcome with a fixed price
New freelancers lose deals by quoting hourly. Package the work instead: a defined deliverable, a defined timeline, and one round of revisions. Clients buy certainty.

## Your first ten conversations
Message ten local businesses whose online presence is clearly broken, and lead with a specific observation — a slow site, no mobile menu, an outdated menu photo. Offer a small, concrete fix. Two replies from ten is a normal, healthy rate.

## Do the first job properly
Communicate on a schedule, deliver a day early, and hand over files cleanly. Then ask for two things: a short testimonial and one introduction. That is how a first client becomes a pipeline.

## Price rises with proof
Raise your rate every three completed projects. Your skill improves faster than your confidence, and your pricing should follow the skill.`,
    category: "Career",
    cover_image: "/images/articles/freelancing.jpg",
    author: "SkillStack Faculty",
    read_minutes: 5,
    tags: ["freelancing", "career", "clients", "pricing"],
    featured: false,
    published: true,
    published_at: "2026-08-04T09:00:00.000Z",
  },
];
