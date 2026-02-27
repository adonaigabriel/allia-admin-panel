"use client";

export default function AllIALogo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const dimensions = {
    small: { width: 120, height: 40 },
    default: { width: 180, height: 60 },
    large: { width: 240, height: 80 },
  };

  const { width, height } = dimensions[size];

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Icon mark */}
        <svg width={height * 0.7} height={height * 0.7} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background shape */}
          <rect x="2" y="2" width="44" height="44" rx="12" fill="#DC2626" />
          {/* AI brain circuit pattern */}
          <circle cx="24" cy="20" r="8" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="24" cy="20" r="3" fill="white" />
          <line x1="24" y1="28" x2="24" y2="36" stroke="white" strokeWidth="2" />
          <line x1="16" y1="20" x2="10" y2="20" stroke="white" strokeWidth="2" />
          <line x1="32" y1="20" x2="38" y2="20" stroke="white" strokeWidth="2" />
          <line x1="18.3" y1="14.3" x2="13" y2="9" stroke="white" strokeWidth="2" />
          <line x1="29.7" y1="14.3" x2="35" y2="9" stroke="white" strokeWidth="2" />
          <circle cx="10" cy="20" r="2" fill="white" />
          <circle cx="38" cy="20" r="2" fill="white" />
          <circle cx="13" cy="9" r="2" fill="white" />
          <circle cx="35" cy="9" r="2" fill="white" />
          <circle cx="24" cy="36" r="2" fill="white" />
          {/* Bottom text bar */}
          <rect x="14" y="40" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className="font-extrabold tracking-tight leading-none"
          style={{ fontSize: height * 0.45, color: "#DC2626" }}
        >
          All<span style={{ color: "#111111" }}>IA</span>
        </span>
        <span
          className="text-gray-500 font-medium tracking-widest uppercase"
          style={{ fontSize: height * 0.15 }}
        >
          VirtuHelper
        </span>
      </div>
    </div>
  );
}
