export interface Project {
  slug: string;
  title: string;
  kind: "software" | "data";
  summary: string;
  tags: string[];
  live?: string;
  github?: string;
  caseStudy: boolean;
  metrics?: { value: string; label: string }[];
  year: string;
}

export const projects: Project[] = [
  {
    slug: "bustandeen",
    title: "Bustandeen",
    kind: "software",
    summary:
      "Free, ad-free Islamic worship companion: salat with kaza tracking, zikr, Quran reading and hifz, fiqh-aware fasting, prayer times and Qibla. Offline-first PWA in English and Bangla.",
    tags: ["React", "TypeScript", "Express", "MongoDB", "Firebase Auth", "PWA"],
    live: "https://bustandeen.com",
    github: "https://github.com/isttiiak/bustandeen-web-app",
    caseStudy: true,
    metrics: [
      { value: "300+", label: "releases" },
      { value: "220+", label: "test files" },
      { value: "2", label: "languages" },
    ],
    year: "2025–26",
  },
  {
    slug: "fintrack",
    title: "FinTrack",
    kind: "software",
    summary:
      "Open-source personal finance app with expense tracking, lent/debt ledger, and investment portfolio, plus 10 AI-powered features running on Groq.",
    tags: ["React 19", "TypeScript", "Supabase", "TanStack", "Groq AI", "Framer Motion"],
    live: "https://fin-track-eight-blue.vercel.app",
    github: "https://github.com/isttiiak/FinTrack",
    caseStudy: true,
    metrics: [
      { value: "10", label: "AI features" },
      { value: "RLS", label: "row-level security" },
    ],
    year: "2025",
  },
  {
    slug: "mercari-price-suggestion",
    title: "Mercari Price Suggestion",
    kind: "data",
    summary:
      "End-to-end ML pipeline that predicts fair listing prices from title, description, category, and brand, using NLP feature engineering, LightGBM, and FastAPI serving.",
    tags: ["Python", "LightGBM", "NLP", "FastAPI", "Pandas", "Scikit-learn"],
    github: "https://github.com/isttiiak/mercari-price-suggestion",
    caseStudy: true,
    metrics: [
      { value: "0.465", label: "RMSLE" },
      { value: "25.5%", label: "over baseline" },
      { value: "$10.44", label: "MAE" },
    ],
    year: "2026",
  },
  {
    slug: "adaptive-rating-thesis",
    title: "Adaptive Rating System",
    kind: "data",
    summary:
      "Undergraduate thesis (grade A) in a team of five: a Chrome extension for safer online shopping. I led its rating system: Bayesian averaging with exponential time decay, plus English and Bangla review sentiment.",
    tags: ["Bayesian statistics", "Sentiment analysis", "OpenAI API", "Chrome Extension", "User study"],
    github: "https://github.com/isttiiak/e-commerce-extension",
    caseStudy: true,
    metrics: [
      { value: "A", label: "thesis grade" },
      { value: "29", label: "user-study participants" },
    ],
    year: "2024–25",
  },
  {
    slug: "cinetrack",
    title: "CineTrack",
    kind: "software",
    summary:
      "Movie & series watchlist with instant guest mode, Google sign-in with real-time Firestore sync, and TMDB poster auto-fetch.",
    tags: ["React", "TypeScript", "Firestore", "TMDB API", "Framer Motion"],
    live: "https://cine-track-silk.vercel.app",
    github: "https://github.com/isttiiak/CineTrack",
    caseStudy: false,
    year: "2026",
  },
  {
    slug: "brain-stroke-classification",
    title: "Brain Stroke Classification",
    kind: "data",
    summary:
      "Team course project (CSE422) on 43,400 clinical records with heavy class imbalance. My part: preprocessing, missing-value treatment and the logistic regression model; the team compared 4 classifiers with 10-fold cross-validation.",
    tags: ["Python", "Scikit-learn", "SMOTE", "Random Forest", "EDA"],
    github: "https://github.com/RejwanShafi25/Brain-stroke-analysis-and-classification--CSE422-Project",
    caseStudy: false,
    metrics: [
      { value: "96.79%", label: "team best accuracy" },
      { value: "43.4K", label: "records" },
    ],
    year: "2023",
  },
  {
    slug: "citynet-isp",
    title: "cityNet ISP",
    kind: "software",
    summary:
      "ISP customer & billing management system: subscriptions, complaints, payment tracking across a client-server MERN architecture.",
    tags: ["React", "Node.js", "MongoDB", "Firebase Auth"],
    github: "https://github.com/isttiiak/cityNet-isp",
    caseStudy: false,
    year: "2024",
  },
];

export const featuredProjects = projects.filter((p) =>
  ["bustandeen", "fintrack", "mercari-price-suggestion", "cinetrack"].includes(p.slug)
);

export const dataProjects = projects.filter((p) => p.kind === "data");
