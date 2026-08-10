/**
 * SkillShorts Content Model & Service Abstraction
 * Fully decoupled from UI to allow future Supabase persistence.
 */

export type ShortType = "video" | "infographic" | "comic" | "audio" | "quiz";

export type Slide = {
  title: string;
  text: string;
  codeSnippet?: string;
  tag?: string;
};

export type QuizOption = {
  text: string;
  isCorrect: boolean;
};

export type ShortItem = {
  id: string;
  type: ShortType;
  title: string;
  category: "Coding" | "AI" | "Web Development" | "Design" | "Audio" | "Comics";
  creator: {
    name: string;
    avatar: string;
    role: string;
  };
  description: string;
  duration?: string;
  videoUrl?: string;
  posterUrl?: string;
  audioUrl?: string;
  slides?: Slide[];
  quiz?: {
    question: string;
    options: QuizOption[];
    explanation: string;
  };
  cta?: {
    label: string;
    href: string;
  };
  initialLikes: number;
  initialCommentsCount: number;
};

export type Comment = {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
};

const DEV_SHORTS_DATA: ShortItem[] = [
  {
    id: "short-1",
    type: "comic",
    title: "How Web Servers Work (In 3 Slides)",
    category: "Comics",
    creator: {
      name: "SkillStack Visuals",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "Visual Educator",
    },
    description: "Understand the Client-Server HTTP cycle without complex jargon.",
    slides: [
      {
        title: "1. The Request",
        text: "Your browser (Client) sends an HTTP Request asking: 'Hey Server, give me the index.html page!'",
        tag: "CLIENT",
      },
      {
        title: "2. The Processing",
        text: "The Server checks its filesystem or database, prepares the HTML, CSS, and JS files.",
        tag: "SERVER",
      },
      {
        title: "3. The Response",
        text: "The Server responds with HTTP Status 200 OK + payload. Your browser renders the beautiful site!",
        tag: "RESPONSE",
      },
    ],
    cta: {
      label: "Explore Web Dev Course",
      href: "/courses/full-stack-web-development",
    },
    initialLikes: 1420,
    initialCommentsCount: 38,
  },
  {
    id: "short-2",
    type: "video",
    title: "CSS Grid vs Flexbox: When to use which?",
    category: "Coding",
    creator: {
      name: "Alex Dev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      role: "Frontend Lead",
    },
    description: "Flexbox is 1D (rows OR columns). Grid is 2D (rows AND columns simultaneously). Use Flexbox for linear layouts, Grid for page structures!",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    duration: "0:45",
    cta: {
      label: "Learn Modern Frontend",
      href: "/courses/frontend-engineering",
    },
    initialLikes: 2890,
    initialCommentsCount: 74,
  },
  {
    id: "short-3",
    type: "quiz",
    title: "Test Your JavaScript Knowledge!",
    category: "Coding",
    creator: {
      name: "SkillStack Quiz",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      role: "Interactive Tutor",
    },
    description: "Quick 1-question check to sharpen your JS mental model.",
    quiz: {
      question: "What is the result of `typeof NaN` in JavaScript?",
      options: [
        { text: "'number'", isCorrect: true },
        { text: "'undefined'", isCorrect: false },
        { text: "'nan'", isCorrect: false },
        { text: "'object'", isCorrect: false },
      ],
      explanation: "In JavaScript, NaN stands for 'Not-a-Number', but its technical type in the ECMAScript spec is numeric! Hence `typeof NaN === 'number'`.",
    },
    cta: {
      label: "View All JS Modules",
      href: "/knowledge",
    },
    initialLikes: 3100,
    initialCommentsCount: 112,
  },
  {
    id: "short-4",
    type: "audio",
    title: "What is Transformer Architecture in AI?",
    category: "Audio",
    creator: {
      name: "Dr. Sarah Lin",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      role: "AI Researcher",
    },
    description: "60-second audio snack explaining self-attention mechanism in LLMs like ChatGPT.",
    duration: "1:00",
    audioUrl: "https://actions.google.com/sounds/v1/science/digital_waves.ogg",
    cta: {
      label: "Explore AI & ML Program",
      href: "/courses/artificial-intelligence-machine-learning",
    },
    initialLikes: 980,
    initialCommentsCount: 29,
  },
  {
    id: "short-5",
    type: "infographic",
    title: "The 6-Step UI Design Workflow",
    category: "Design",
    creator: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "UI/UX Director",
    },
    description: "From user research to design handoff — the industry standard process.",
    slides: [
      {
        title: "1. User Research",
        text: "Understand user pain points, conduct interviews, and define target personas.",
        tag: "DISCOVERY",
      },
      {
        title: "2. Wireframing",
        text: "Create low-fidelity layout sketches to test information architecture before visual polish.",
        tag: "ARCHITECTURE",
      },
      {
        title: "3. UI Prototyping",
        text: "Design high-fidelity interactive screens with typography, color tokens, and smooth micro-interactions.",
        tag: "DESIGN",
      },
      {
        title: "4. Handoff & Review",
        text: "Export design tokens, redlines, and assets for developer implementation.",
        tag: "SHIPPING",
      },
    ],
    cta: {
      label: "UI/UX Masterclass",
      href: "/courses/ui-ux-design-mastery",
    },
    initialLikes: 1840,
    initialCommentsCount: 45,
  },
];

const DEV_COMMENTS: Record<string, Comment[]> = {
  "short-1": [
    {
      id: "c1",
      userName: "Hassan Ali",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      text: "This explanation made HTTP request response crystal clear! Thank you!",
      createdAt: "2 hours ago",
    },
    {
      id: "c2",
      userName: "Fatima Noor",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      text: "The slide visual format is so easy to digest on mobile.",
      createdAt: "5 hours ago",
    },
  ],
  "short-2": [
    {
      id: "c3",
      userName: "Usman Raza",
      userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
      text: "1D vs 2D is the simplest way anyone has ever explained Flexbox vs Grid!",
      createdAt: "1 hour ago",
    },
  ],
};

/**
 * Service Repository Interface (Decoupled API abstraction)
 */
export async function getShortsFeed(category?: string): Promise<ShortItem[]> {
  // Simulate rapid async fetch
  await new Promise((res) => setTimeout(res, 80));
  if (!category || category === "All") {
    return DEV_SHORTS_DATA;
  }
  return DEV_SHORTS_DATA.filter((s) => s.category === category);
}

export async function getShortById(id: string): Promise<ShortItem | undefined> {
  return DEV_SHORTS_DATA.find((s) => s.id === id);
}

export function getShortCategories(): string[] {
  return ["All", "Coding", "AI", "Web Development", "Design", "Audio", "Comics"];
}

export async function getShortComments(shortId: string): Promise<Comment[]> {
  return DEV_COMMENTS[shortId] || [];
}
