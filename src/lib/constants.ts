export const BRAND = {
  name: "SkillStack",
  tagline: "From Learning to Earning.",
  subtitle: "Premium Learning Academy",
  organization: "An Initiative of The Prudents",
  email: "skillstack.pk.official@gmail.com",
  phone1: "+92 332 3131737",
  phone2: "+92 341 9293971",
  address: "H392+Q85, Rawalpindi, Pakistan",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61591636781863",
    instagram: "https://www.instagram.com/skillstack.pk.official/",
    x: "https://x.com/Skillstackpk",
    youtube: "https://www.youtube.com/@Skillstack-h2x",
    discord: "https://discord.com/channels/@me",
    whatsapp: "https://chat.whatsapp.com/CBK98JEFqCt8VSq27J8OAI",
    email: "mailto:skillstack.pk.official@gmail.com",
  },
};

export const PROGRAMS = [
  {
    title: "Web Development",
    slug: "web-development",
    description:
      "Master full-stack development with modern frameworks, real-world projects, and production-grade code.",
    duration: "6 Months",
    difficulty: "Intermediate",
    projects: "12+ Projects",
    category: "Physical",
    status: "Available",
    features: ["React & Next.js", "Node.js & APIs", "Database Design", "Deployment"],
    curriculum: [
      {
        module: "Foundations",
        topics: ["HTML5 & CSS3", "JavaScript ES6+", "Git & Version Control"],
      },
      { module: "Frontend", topics: ["React Fundamentals", "Next.js & SSR", "Tailwind CSS"] },
      { module: "Backend", topics: ["Node.js & Express", "REST APIs", "PostgreSQL"] },
      {
        module: "Production",
        topics: ["Authentication", "Deployment", "Performance Optimization"],
      },
    ],
  },
  {
    title: "Graphic Designing",
    slug: "graphic-designing",
    description:
      "Learn visual storytelling, brand identity, and digital design using industry-standard tools.",
    duration: "4 Months",
    difficulty: "Beginner to Advanced",
    projects: "10+ Projects",
    category: "Physical",
    status: "Available",
    features: ["Adobe Suite", "Brand Identity", "UI/UX Design", "Portfolio Building"],
    curriculum: [
      {
        module: "Design Principles",
        topics: ["Color Theory", "Typography", "Composition", "Visual Hierarchy"],
      },
      {
        module: "Adobe Photoshop",
        topics: ["Photo Editing", "Digital Art", "UI Mockups", "Social Media Graphics"],
      },
      {
        module: "Adobe Illustrator",
        topics: ["Logo Design", "Vector Graphics", "Brand Assets", "Iconography"],
      },
      {
        module: "Adobe InDesign",
        topics: ["Layout Design", "Print Production", "Magazine Layouts", "Brochure Design"],
      },
    ],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Become a complete digital marketer. Learn SEO, social media, content strategy, paid ads, and analytics.",
    duration: "4 Months",
    difficulty: "Beginner to Intermediate",
    projects: "8+ Projects",
    category: "Physical",
    status: "Available",
    features: [
      "SEO & SEM",
      "Social Media Marketing",
      "Google Ads Certified",
      "Analytics & Reporting",
    ],
    curriculum: [
      {
        module: "Marketing Fundamentals",
        topics: ["Digital Landscape", "Customer Journey", "Brand Positioning", "Content Strategy"],
      },
      {
        module: "SEO & Content",
        topics: ["On-Page SEO", "Off-Page SEO", "Keyword Research", "Content Marketing"],
      },
      {
        module: "Social Media Marketing",
        topics: [
          "Facebook & Instagram",
          "LinkedIn Marketing",
          "Content Calendars",
          "Community Management",
        ],
      },
      {
        module: "Paid Advertising & Analytics",
        topics: ["Google Ads", "Facebook Ads", "Google Analytics", "ROI Measurement"],
      },
    ],
  },
  {
    title: "E-Commerce",
    slug: "e-commerce",
    description:
      "Learn to build, launch, and scale a profitable online store from product sourcing to marketing.",
    duration: "3 Months",
    difficulty: "Beginner",
    projects: "6+ Projects",
    category: "Physical",
    status: "Available",
    features: [
      "Store Setup",
      "Product Sourcing",
      "Marketing Automation",
      "Logistics & Fulfillment",
    ],
    curriculum: [
      {
        module: "E-Commerce Foundations",
        topics: ["Business Models", "Market Research", "Platform Selection", "Store Setup"],
      },
      {
        module: "Operations",
        topics: [
          "Product Sourcing",
          "Inventory Management",
          "Pricing Strategy",
          "Customer Service",
        ],
      },
      {
        module: "Marketing & Growth",
        topics: [
          "Social Media Marketing",
          "Email Marketing",
          "Paid Advertising",
          "Conversion Optimization",
        ],
      },
    ],
  },
];

export const LIBRARY_RESOURCES = [
  {
    title: "Python",
    category: "Programming",
    description:
      "Learn Python from basics to advanced concepts including data structures, OOP, and automation.",
    icon: "code",
    duration: "Self-paced",
    lessons: 24,
    difficulty: "Beginner",
    tags: ["Python", "OOP", "Data Structures", "Automation"],
  },
  {
    title: "Video Editing",
    category: "Creative",
    description:
      "Master video editing with Adobe Premiere Pro and After Effects for YouTube, ads, and films.",
    icon: "video",
    duration: "Self-paced",
    lessons: 18,
    difficulty: "Beginner",
    tags: ["Premiere Pro", "After Effects", "Color Grading", "Sound Design"],
  },
  {
    title: "AI Tools",
    category: "Technology",
    description:
      "Explore ChatGPT, Midjourney, and other AI tools to boost productivity and creativity.",
    icon: "sparkles",
    duration: "Self-paced",
    lessons: 12,
    difficulty: "Beginner",
    tags: ["ChatGPT", "Midjourney", "Prompt Engineering", "AI Automation"],
  },
  {
    title: "Freelancing",
    category: "Career",
    description:
      "Learn to find clients, set rates, write proposals, and build a sustainable freelance career.",
    icon: "briefcase",
    duration: "Self-paced",
    lessons: 10,
    difficulty: "Beginner",
    tags: ["Upwork", "Fiverr", "Client Management", "Proposals"],
  },
  {
    title: "UI/UX Design",
    category: "Design",
    description: "Master user-centered design principles, wireframing, prototyping, and Figma.",
    icon: "palette",
    duration: "Self-paced",
    lessons: 20,
    difficulty: "Intermediate",
    tags: ["Figma", "Wireframing", "Prototyping", "User Research"],
  },
  {
    title: "Graphic Designing",
    category: "Design",
    description:
      "Learn design fundamentals, color theory, and Adobe Creative Suite for stunning visuals.",
    icon: "palette",
    duration: "Self-paced",
    lessons: 16,
    difficulty: "Beginner",
    tags: ["Photoshop", "Illustrator", "Color Theory", "Branding"],
  },
  {
    title: "Web Development",
    category: "Programming",
    description: "Full-stack web development covering HTML, CSS, JavaScript, React, and Node.js.",
    icon: "code",
    duration: "Self-paced",
    lessons: 30,
    difficulty: "Intermediate",
    tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
  },
  {
    title: "Digital Marketing",
    category: "Marketing",
    description:
      "Complete digital marketing course covering SEO, social media, email, and paid advertising.",
    icon: "trending-up",
    duration: "Self-paced",
    lessons: 22,
    difficulty: "Beginner",
    tags: ["SEO", "Social Media", "Email Marketing", "Google Ads"],
  },
  {
    title: "English Language",
    category: "Language",
    description:
      "Improve your English communication, grammar, and presentation skills for professional success.",
    icon: "book",
    duration: "Self-paced",
    lessons: 15,
    difficulty: "Beginner",
    tags: ["Grammar", "Speaking", "Writing", "Communication"],
  },
  {
    title: "Cyber Security",
    category: "Technology",
    description: "Learn ethical hacking, network security, and cybersecurity fundamentals.",
    icon: "shield",
    duration: "Self-paced",
    lessons: 18,
    difficulty: "Intermediate",
    tags: ["Ethical Hacking", "Network Security", "Penetration Testing", "OWASP"],
  },
];

export const WHY_CHOOSE = [
  {
    icon: "users",
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with years of real-world experience who are passionate about teaching.",
  },
  {
    icon: "zap",
    title: "Project-Based Learning",
    description:
      "Build real projects that you can showcase in your portfolio. Learn by doing, not just watching.",
  },
  {
    icon: "monitor",
    title: "Hybrid Model",
    description:
      "Choose between physical classroom learning or online classes. Flexibility that fits your schedule.",
  },
  {
    icon: "award",
    title: "Recognized Certification",
    description:
      "Earn industry-recognized certificates that validate your skills and boost your career prospects.",
  },
];

export const LEARNING_PROCESS = [
  {
    step: "01",
    title: "Choose Your Path",
    description:
      "Browse our programs and select the course that aligns with your career goals and interests.",
  },
  {
    step: "02",
    title: "Enroll & Get Started",
    description:
      "Complete your enrollment and gain instant access to your course materials and learning dashboard.",
  },
  {
    step: "03",
    title: "Learn & Build",
    description:
      "Attend classes, complete assignments, and build real-world projects with guidance from mentors.",
  },
  {
    step: "04",
    title: "Get Certified",
    description:
      "Complete your program, earn your certificate, and step into your new career with confidence.",
  },
];

export const LEARNING_ROADMAP = [
  {
    phase: "Foundation",
    duration: "Month 1",
    description:
      "Start with fundamentals and core concepts. Build a strong base for your learning journey.",
    milestones: [
      "Setup development environment",
      "Complete orientation",
      "Master basic concepts",
      "First mini-project",
    ],
  },
  {
    phase: "Development",
    duration: "Month 2-3",
    description:
      "Dive deep into the core technologies and frameworks. Start building real applications.",
    milestones: [
      "Build your first project",
      "Master core frameworks",
      "Collaborate with peers",
      "Mid-term assessment",
    ],
  },
  {
    phase: "Advanced",
    duration: "Month 4-5",
    description: "Work on advanced topics, real-world scenarios, and industry best practices.",
    milestones: [
      "Advanced project build",
      "Industry best practices",
      "Code review sessions",
      "Portfolio development",
    ],
  },
  {
    phase: "Career Ready",
    duration: "Month 6",
    description:
      "Finalize your portfolio, prepare for interviews, and get career guidance and support.",
    milestones: [
      "Final project completion",
      "Portfolio review",
      "Interview preparation",
      "Career counseling",
    ],
  },
];

export const SUCCESS_TIMELINE = [
  {
    date: "June 2025",
    title: "SkillStack Founded",
    description:
      "SkillStack was born from a vision to bridge the gap between education and employability in Pakistan.",
  },
  {
    date: "August 2025",
    title: "First Batch Enrolled",
    description:
      "Our inaugural batch of 30 students began their journey in Web Development and Graphic Design.",
  },
  {
    date: "December 2025",
    title: "100+ Graduates",
    description:
      "Crossed our first major milestone with over 100 graduates completing their programs successfully.",
  },
  {
    date: "March 2026",
    title: "Library Launch",
    description:
      "Launched our self-paced learning library with 10+ free resources accessible to the community.",
  },
  {
    date: "June 2026",
    title: "Industry Partnerships",
    description:
      "Formed partnerships with local tech companies for internships and job placements for graduates.",
  },
  {
    date: "September 2026",
    title: "New Campus",
    description:
      "Expanding to a new, larger campus to accommodate growing enrollment and new programs.",
  },
];

export const STATS = [
  { label: "Students Enrolled", value: 250, suffix: "+" },
  { label: "Programs", value: 4, suffix: "" },
  { label: "Resources", value: 10, suffix: "+" },
  { label: "Satisfaction", value: 98, suffix: "%" },
];

export const TESTIMONIALS = [
  {
    name: "Ayesha Khan",
    role: "Frontend Developer",
    course: "Web Development",
    rating: 5,
    quote:
      "SkillStack transformed my career. The project-based approach meant I graduated with a real portfolio, not just theory. Within a month of completing the program, I landed a remote frontend developer role.",
    avatar: "AK",
  },
  {
    name: "Bilal Raza",
    role: "Freelance Designer",
    course: "Graphic Designing",
    rating: 5,
    quote:
      "The instructors at SkillStack don't just teach tools, they teach you how to think like a designer. I went from zero experience to running my own freelance design business within four months.",
    avatar: "BR",
  },
  {
    name: "Hira Malik",
    role: "Digital Marketing Specialist",
    course: "Digital Marketing",
    rating: 5,
    quote:
      "The digital marketing program at SkillStack is incredibly practical. We worked on real campaigns, analyzed real data, and built strategies that actually work. The mentorship was invaluable.",
    avatar: "HM",
  },
  {
    name: "Usman Tariq",
    role: "E-commerce Entrepreneur",
    course: "E-Commerce",
    rating: 5,
    quote:
      "I launched my online store while still enrolled in the E-Commerce program. The instructors helped me set up everything from payment gateways to shipping logistics. My store is now profitable.",
    avatar: "UT",
  },
  {
    name: "Fatima Noor",
    role: "Junior Web Developer",
    course: "Web Development",
    rating: 5,
    quote:
      "The learning environment at SkillStack is unmatched. Small class sizes, experienced mentors, and a curriculum that actually reflects what employers want. I felt job-ready from day one after graduation.",
    avatar: "FN",
  },
  {
    name: "Hamza Sheikh",
    role: "Social Media Manager",
    course: "Digital Marketing",
    rating: 4,
    quote:
      "SkillStack gave me the skills and confidence to pivot into a digital marketing career. The community support and career guidance sessions helped me land my first social media management role.",
    avatar: "HS",
  },
];

export const PARTNERS = [
  {
    name: "The Prudents",
    description: "Parent Organization",
    initials: "TP",
    href: "/about",
    logo: "/images/homepage/prudents.png",
  },
  {
    name: "Rottey",
    description: "Official Partner",
    initials: "RT",
    href: "/contact",
    logo: "/images/homepage/rottery.png",
  },
  {
    name: "Pakwan Ghar",
    description: "Official Partner",
    initials: "PG",
    href: "/contact",
    logo: "/images/homepage/pakwanghar.webp",
    // Dark mark — rendered as a solid white silhouette so it stays visible on the dark surface
    whiten: true,
  },
];

export const QUICK_ACCESS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Chat with our admissions team",
    href: BRAND.social.whatsapp,
    action: "Open chat",
    external: true,
  },
  {
    id: "admission",
    label: "Admission Form",
    description: "Apply for the upcoming batch",
    href: "/admissions",
    action: "Start application",
    external: false,
  },
  {
    id: "facebook",
    label: "Facebook",
    description: "Campus updates and events",
    href: BRAND.social.facebook,
    action: "Follow page",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    description: "Student work and reels",
    href: BRAND.social.instagram,
    action: "Follow us",
    external: true,
  },
  {
    id: "location",
    label: "Location",
    description: BRAND.address,
    href: "https://maps.google.com/?q=H392%2BQ85+Rawalpindi+Pakistan",
    action: "Get directions",
    external: true,
  },
];

export const ACHIEVEMENTS = [
  { label: "Projects Built", value: 500, suffix: "+" },
  { label: "Certificates Issued", value: 200, suffix: "+" },
  { label: "Job Placements", value: 85, suffix: "%" },
  { label: "Community Members", value: 300, suffix: "+" },
];

export const FAQS = [
  {
    question: "What programs does SkillStack offer?",
    answer:
      "SkillStack offers four main programs: Web Development, Graphic Designing, Digital Marketing, and E-Commerce. We also offer self-paced learning resources in our Library section including Python, Video Editing, AI Tools, and more.",
  },
  {
    question: "How long are the programs?",
    answer:
      "Program durations vary: Web Development is 6 months, Graphic Designing and Digital Marketing are 4 months each, and E-Commerce is 3 months. Classes are held Monday to Friday with 2-hour sessions.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "No prior experience is required for most programs. Our curriculum is designed to take you from beginner to job-ready. Some advanced topics may require basic computer literacy.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Yes, upon successful completion of your program including all modules, projects, and assessments, you will receive a SkillStack certificate with a unique verification ID and QR code.",
  },
  {
    question: "What is the class size?",
    answer:
      "We keep our class sizes small, typically 15-20 students per batch, to ensure personalized attention and quality education for every student.",
  },
  {
    question: "Do I need my own laptop?",
    answer:
      "Yes, students are required to bring their own laptop for physical classes. Minimum specifications vary by program. Contact us for detailed requirements.",
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Admissions", href: "/admissions" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Courses",
    links: [
      { label: "Web Development", href: "/courses/web-development" },
      { label: "Graphic Designing", href: "/courses/graphic-designing" },
      { label: "Digital Marketing", href: "/courses/digital-marketing" },
      { label: "E-Commerce", href: "/courses/e-commerce" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Knowledge Hub", href: "/knowledge" },
      { label: "Blog", href: "/blog" },
      { label: "Downloads", href: "/downloads" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
      { label: "Student Showcase", href: "/showcase" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Code of Conduct", href: "/code-of-conduct" },
    ],
  },
];
