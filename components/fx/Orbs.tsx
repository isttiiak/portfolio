export function Orbs({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <div
        className="absolute -left-24 top-1/4 h-96 w-96 rounded-full opacity-[0.13] blur-3xl"
        style={{
          background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          animation: "orb-drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-32 top-1/2 h-[28rem] w-[28rem] rounded-full opacity-[0.09] blur-3xl"
        style={{
          background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
          animation: "orb-drift 28s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full opacity-[0.1] blur-3xl"
        style={{
          background: "radial-gradient(circle, #c2410c 0%, transparent 70%)",
          animation: "orb-drift 25s ease-in-out infinite",
          animationDelay: "-8s",
        }}
      />
    </div>
  );
}
