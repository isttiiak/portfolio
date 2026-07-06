export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "SQL", "TypeScript", "JavaScript", "Bash"],
  },
  {
    label: "Web & Backend",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Firebase",
      "REST APIs",
    ],
  },
  {
    label: "Data & ML",
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "LightGBM",
      "XGBoost",
      "Seaborn",
      "Plotly",
      "Hypothesis testing",
      "Bayesian reasoning",
      "Time series (ARIMA, Prophet)",
      "NLP",
    ],
  },
  {
    label: "Data Engineering & Ops",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "FastAPI",
      "Apache Spark",
      "Airflow",
      "Docker",
      "Git",
      "Linux",
      "CI/CD",
    ],
  },
];

export const marqueeSkills = [
  "Python",
  "SQL",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Pandas",
  "Scikit-learn",
  "LightGBM",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Firebase",
  "Docker",
  "Airflow",
  "Apache Spark",
  "Git",
  "Linux",
  "Tailwind CSS",
];
