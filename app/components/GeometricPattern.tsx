"use client";

export default function GeometricPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-right geometric pattern similar to virtuallit.com.br */}
      <div className="absolute -top-20 -right-20 w-80 h-80 opacity-10">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="40" height="40" fill="#DC2626" />
          <rect x="50" y="0" width="40" height="40" fill="#DC2626" opacity="0.7" />
          <rect x="100" y="0" width="40" height="40" fill="#DC2626" opacity="0.4" />
          <rect x="0" y="50" width="40" height="40" fill="#DC2626" opacity="0.7" />
          <rect x="50" y="50" width="40" height="40" fill="#DC2626" opacity="0.5" />
          <rect x="100" y="50" width="40" height="40" fill="#DC2626" opacity="0.3" />
          <rect x="150" y="0" width="40" height="40" fill="#DC2626" opacity="0.2" />
          <rect x="0" y="100" width="40" height="40" fill="#DC2626" opacity="0.4" />
          <rect x="50" y="100" width="40" height="40" fill="#DC2626" opacity="0.3" />
          <rect x="150" y="50" width="40" height="40" fill="#DC2626" opacity="0.15" />
          <rect x="100" y="100" width="40" height="40" fill="#DC2626" opacity="0.2" />
          <polygon points="0,150 40,150 40,190" fill="#DC2626" opacity="0.3" />
          <polygon points="50,100 90,100 50,140" fill="#DC2626" opacity="0.2" />
          <polygon points="150,0 190,0 190,40" fill="#DC2626" opacity="0.15" />
        </svg>
      </div>

      {/* Bottom-left geometric pattern */}
      <div className="absolute -bottom-20 -left-20 w-60 h-60 opacity-5 rotate-180">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="40" height="40" fill="#DC2626" />
          <rect x="50" y="0" width="40" height="40" fill="#DC2626" opacity="0.7" />
          <rect x="0" y="50" width="40" height="40" fill="#DC2626" opacity="0.7" />
          <rect x="50" y="50" width="40" height="40" fill="#DC2626" opacity="0.5" />
          <rect x="100" y="0" width="40" height="40" fill="#DC2626" opacity="0.4" />
        </svg>
      </div>

      {/* Floating red circles */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-red-500 rounded-full animate-pulse-red" />
      <div className="absolute top-3/4 right-20 w-3 h-3 bg-red-500 rounded-full animate-pulse-red" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-red-500 rounded-full animate-pulse-red" style={{ animationDelay: "2s" }} />
    </div>
  );
}
