export interface TimelineItem {
  period: string;
  title: string;
  place: string;
  points: string[];
  accent?: boolean;
}

export const timeline: TimelineItem[] = [
  {
    period: "Feb — Jul 2026",
    title: "Certification in Data Science (ITS 507)",
    place: "BRAC University · SICIP, Finance Division, Govt. of Bangladesh",
    accent: true,
    points: [
      "100-hour skills training — completed and certified (Jul 2026)",
      "Admitted via competitive national written exam and interview",
      "Advanced ML (XGBoost, LightGBM), Bayesian statistics, time series (ARIMA, Prophet)",
      "Big data (Hadoop, Spark), data pipelines & workflow automation (Airflow), Ops, NLP & text mining",
      "Capstone: Mercari price suggestion — end-to-end ML pipeline",
    ],
  },
  {
    period: "2021 — 2025",
    title: "BSc in Computer Science",
    place: "BRAC University, Dhaka",
    accent: true,
    points: [
      "Thesis: Bayesian adaptive rating system for e-commerce with AI sentiment analysis — commended by supervisor for statistical rigour",
      "imaGen Ventures Youth Challenge 2024 national finalist (UNICEF & JAAGO)",
      "6 credits from Bard College at Simon's Rock (international exchange)",
      "Executive member, BRACU Robotics Club",
    ],
  },
  {
    period: "2019 — present",
    title: "Co-founder & Executive Volunteer",
    place: "ARUN — non-profit community organisation",
    points: [
      "5+ years leading disaster relief fundraising and donation campaigns",
    ],
  },
  {
    period: "2018 — 2020",
    title: "Higher Secondary Certificate",
    place: "Notre Dame College, Mymensingh",
    points: ["Science stream"],
  },
];

export const counters = [
  { value: 3, suffix: "", label: "products live in production" },
  { value: 77, suffix: "", label: "public repositories" },
  { value: 10, suffix: "+", label: "AI features shipped" },
  { value: 43, suffix: "K", label: "records in largest dataset" },
];
