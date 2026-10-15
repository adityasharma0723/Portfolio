import type { PortfolioData } from "./types";

// ─────────────────────────────────────────────
//  Single source of truth for all portfolio content.
//  Components must never hardcode CV text —
//  import from here instead.
// ─────────────────────────────────────────────

const data: PortfolioData = {
  owner: "Aditya Sharma",
  tagline: "I build things I can explain line by line.",
  heroLede:
    "Final-year B.Tech CSE student at LPU. I build full-stack products, data pipelines and AI tools, and I can explain the reasoning behind every decision.",

  // Set to false to hide the phone number everywhere on the site
  SHOW_PHONE: true,

  contact: {
    email: "addi23sharma09@gmail.com",
    linkedin: "https://linkedin.com/in/aditya-sharma23",
    github: "https://github.com/adityasharma0723",
    mobile: "+91-6398184912",
  },

  projects: [
    {
      id: "estatex",
      title: "EstateX",
      category: "Real Estate Platform",
      date: "Jun 2026",
      oneLiner:
        "A full-stack real estate platform with chat, payments and maps.",
      problem:
        "Property sites tend to look like the same template, and buying or listing means jumping between separate tools.",
      whatItFixes:
        "Property management, live chat, payments and maps in one product with its own visual identity.",
      bullets: [
        "Implemented JWT authentication and Role-Based Access Control (RBAC) for secure user authentication and authorization.",
        "Added property management features with CRUD operations, image uploads, chat, payments, and maps.",
        "Connected REST APIs with MongoDB to integrate frontend and backend application functionality.",
        "Validated REST API endpoints using Postman to verify API requests and responses.",
        "Deployed the frontend and backend using Vercel and Render for accessible web-based application delivery.",
      ],
      whyThisWay:
        "RBAC keeps each type of user in their lane, and Socket.io, Stripe and Cloudinary cover chat, payments and images. The \"Architectural Ledger\" UI direction avoids generic real-estate looks.",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "JWT",
        "Socket.io",
        "Stripe",
        "Cloudinary",
        "Redux Toolkit",
      ],
      repoUrl: "https://github.com/adityasharma0723",
    },
    {
      id: "metricflow",
      title: "MetricFlow",
      category: "Analytics Platform",
      date: "Apr 2026",
      oneLiner: "KPI reporting automation with self-service dashboards.",
      problem:
        "Operational KPIs often get compiled by hand, so reports are slow and take real effort to produce.",
      whatItFixes:
        "Reporting runs automatically, and people can explore the numbers themselves instead of waiting for an analyst.",
      bullets: [
        "Automated KPI reporting through an analytics platform designed to reduce manual reporting effort.",
        "Created data extraction, cleaning, validation, and ETL workflows using Python, SQL, and Pandas.",
        "Presented interactive Power BI dashboards with KPI tracking, drill-down analysis, and dynamic filters.",
        "Analyzed operational data to identify trends and generate actionable business insights.",
        "Enabled self-service reporting through user-friendly dashboards for faster data-driven decision-making.",
      ],
      whyThisWay:
        "Validation sits inside the pipeline, so dashboards only show numbers that passed checks.",
      tech: [
        "Python",
        "SQL",
        "Pandas",
        "Power BI",
        "Excel",
        "ETL",
        "Data Visualization",
      ],
      repoUrl: "https://github.com/adityasharma0723",
    },
    {
      id: "shipjam",
      title: "ShipJam",
      category: "Hackathon Management Platform",
      date: "May 2025",
      oneLiner:
        "A MERN platform for admins, organizers, participants and judges.",
      problem:
        "Hackathons run across scattered forms, chats and spreadsheets, and each kind of user needs a different view.",
      whatItFixes:
        "One platform that manages a hackathon end to end across four roles.",
      bullets: [
        "Developed a MERN platform to manage hackathons across admin, organizer, participant, and judge roles.",
        "Established JWT-based authentication and role-based access control using JWT and bcrypt.",
        "Built REST APIs using Node.js and Express.js with MongoDB and Mongoose for data management.",
        "Structured the backend using separate routes and controllers to maintain modular and testable application logic.",
        "Integrated the React.js frontend using Vite, React Router, Axios, and Tailwind CSS.",
      ],
      whyThisWay:
        "Separate routes and controllers keep logic modular. The UI uses one system: warm off-white, flat ink and coral, no gradients, with every page decision documented.",
      tech: [
        "React.js",
        "Vite",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "REST APIs",
        "JWT",
        "bcrypt",
        "Axios",
      ],
      repoUrl: "https://github.com/adityasharma0723",
    },
  ],

  skillGroups: [
    {
      label: "Languages",
      skills: ["C++", "Python", "JavaScript", "SQL"],
    },
    {
      label: "Frontend, Backend & APIs",
      skills: [
        "React.js",
        "Redux Toolkit",
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT",
      ],
    },
    {
      label: "AI / ML",
      skills: ["NumPy", "Pandas", "Scikit-learn"],
    },
    {
      label: "Tools & Databases",
      skills: ["Git", "GitHub", "Postman", "VS Code", "MongoDB", "MySQL"],
    },
    {
      label: "Data & Visualization",
      skills: ["Power BI", "Matplotlib", "Seaborn"],
    },
  ],

  training: {
    title: "From Data to Insights",
    provider: "Center for Professional Enhancement",
    type: "Certificate",
    date: "Jul 2025",
    bullets: [
      "Completed intensive training in Data Structures and Algorithms with hands-on coding practice.",
      "Learned core concepts of object-oriented programming and algorithm design using C++.",
      "Designed a To-Do List Manager System using OOP and file handling techniques.",
      "Explored Arrays, Linked Lists, Stacks, and Queues through practical problem-solving.",
      "Strengthened problem-solving skills by implementing efficient data structure and algorithm solutions.",
    ],
    tech: [
      "C++",
      "OOP",
      "File Handling",
      "Data Structures",
      "Algorithm Design",
    ],
  },

  certificates: [
    { name: "Oracle Data Platform", issuer: "Oracle", date: "Mar 2026" },
    {
      name: "Data Analytics Job Simulation",
      issuer: "Deloitte",
      date: "Feb 2026",
    },
    {
      name: "Data Analyst Certification",
      issuer: "OneRoadMap",
      date: "Jun 2025",
    },
  ],

  achievements: [
    {
      text: "Top 5 Finalist, CodeStorm Hackathon (LPU), among competing teams.",
    },
    {
      text: "Solved 100+ DSA problems on LeetCode and GeeksforGeeks, strengthening problem-solving and algorithmic skills.",
    },
  ],

  education: [
    {
      institution: "Lovely Professional University",
      location: "Phagwara, Punjab",
      degree:
        "Bachelor of Technology, Computer Science and Engineering (Data Science minor)",
      score: "7.13",
      scoreLabel: "CGPA",
      from: "Aug 2023",
      to: "Present",
    },
    {
      institution: "Gurukul International Academy",
      location: "Najibabad, Uttar Pradesh",
      degree: "Intermediate",
      score: "72%",
      scoreLabel: "Percentage",
      from: "Apr 2021",
      to: "Mar 2023",
    },
    {
      institution: "Gurukul International Academy",
      location: "Najibabad, Uttar Pradesh",
      degree: "Matriculation",
      score: "85%",
      scoreLabel: "Percentage",
      from: "Apr 2020",
      to: "Mar 2021",
    },
  ],
};

export default data;
