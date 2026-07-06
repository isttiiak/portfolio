const stages = [
  { x: 40, label: "EXTRACT", sub: "raw data" },
  { x: 250, label: "TRANSFORM", sub: "features" },
  { x: 460, label: "MODEL", sub: "train + tune" },
  { x: 670, label: "SERVE", sub: "FastAPI" },
];

const BOX_W = 130;
const links = [
  { from: 40 + BOX_W, to: 250 },
  { from: 250 + BOX_W, to: 460 },
  { from: 460 + BOX_W, to: 670 },
];

export function PipelineSVG() {
  return (
    <svg
      viewBox="0 0 840 130"
      role="img"
      aria-label="Animated data pipeline: extract, transform, model, serve"
      className="w-full"
    >
      <defs>
        <linearGradient id="pipe-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>

      {links.map((link, i) => (
        <g key={i}>
          <path d={`M ${link.from} 65 H ${link.to}`} stroke="#292524" strokeWidth="2" fill="none" />
          <path
            d={`M ${link.from} 65 H ${link.to}`}
            stroke="url(#pipe-grad)"
            strokeWidth="2"
            strokeDasharray="7 11"
            fill="none"
            opacity="0.8"
          >
            <animate attributeName="stroke-dashoffset" from="36" to="0" dur="1.3s" repeatCount="indefinite" />
          </path>
          <circle r="4" fill="#fbbf24">
            <animateMotion
              dur="2.6s"
              begin={`${i * 0.85}s`}
              repeatCount="indefinite"
              path={`M ${link.from} 65 H ${link.to}`}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.15;0.85;1"
              dur="2.6s"
              begin={`${i * 0.85}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {stages.map((stage, i) => (
        <g key={stage.label}>
          <rect
            x={stage.x}
            y="35"
            width={BOX_W}
            height="60"
            rx="10"
            fill="#1c1917"
            stroke={i === stages.length - 1 ? "#f97316" : "#292524"}
            strokeWidth="1.5"
          />
          <text
            x={stage.x + BOX_W / 2}
            y="60"
            textAnchor="middle"
            fill={i === stages.length - 1 ? "#fbbf24" : "#faf6f0"}
            style={{ font: "600 13px var(--font-jetbrains-mono), monospace", letterSpacing: "0.1em" }}
          >
            {stage.label}
          </text>
          <text
            x={stage.x + BOX_W / 2}
            y="80"
            textAnchor="middle"
            fill="#78716c"
            style={{ font: "400 11px var(--font-jetbrains-mono), monospace" }}
          >
            {stage.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
