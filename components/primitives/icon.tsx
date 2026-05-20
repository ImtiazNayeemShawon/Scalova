interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  filled?: boolean;
}

export const Icon = ({ name, size = 16, className, style }: IconProps) => {
  const s = size;
  const common = {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    style,
  };

  switch (name) {
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...common}>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "git":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="12" r="2" />
          <path d="M6 8v8M8 12c2 0 4-1 4-3v0c0-2 2-3 4-3" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 20h16M7 16V9M12 16V5M17 16v-4" />
        </svg>
      );
    case "deck":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="12" rx="1.5" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "logs":
      return (
        <svg {...common}>
          <path d="M4 5h16M4 10h16M4 15h10M4 20h7" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...common}>
          <path d="M3 12V5l3-2h12l3 2v7M3 12h6l1 3h4l1-3h6M3 12v7h18v-7" />
        </svg>
      );
    case "command":
      return (
        <svg {...common}>
          <path d="M9 6a3 3 0 1 0 0 6h6a3 3 0 1 0 0-6H9zM9 18a3 3 0 1 1 0-6h6a3 3 0 1 1 0 6H9z" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M12 3v18M3 8h18M5 8l-2 6h4l-2-6Zm14 0-2 6h4l-2-6Z" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h8l4 4v14H7zM15 3v4h4" />
        </svg>
      );
    case "image":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="m4 17 5-5 6 6 3-3 2 2" />
        </svg>
      );
    case "video":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="13" height="14" rx="1.5" />
          <path d="m16 9 5-2v10l-5-2" />
        </svg>
      );
    case "table":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <path d="M3 10h18M3 16h18M9 4v16M15 4v16" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "fingerprint":
      return (
        <svg {...common}>
          <path d="M6 11a6 6 0 0 1 12 0v2M8 13a4 4 0 0 1 8 0v2a6 6 0 0 1-1 3M10 15v1a4 4 0 0 0 1 2M14 14v3M5 8a8 8 0 0 1 13.5-2M3 12c0-1 .2-1.9.5-2.7" />
        </svg>
      );
    case "slack":
      return (
        <svg {...common} viewBox="0 0 100 100" fill="currentColor">
          <circle cx="20" cy="35" r="8" />
          <circle cx="20" cy="65" r="8" />
          <circle cx="50" cy="35" r="8" />
          <circle cx="50" cy="65" r="8" />
          <circle cx="80" cy="35" r="8" />
          <circle cx="80" cy="65" r="8" />
        </svg>
      );
    case "github":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      );
    case "linear":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 12h18M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "notion":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "figma":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 13a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4M5 13a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4M5 13H3m16 0h2M12 3v2m0 16v-2" />
        </svg>
      );
    case "salesforce":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="9" opacity="0.3" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      );
    case "asana":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="8" cy="6" r="2" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="8" cy="18" r="2" />
          <circle cx="16" cy="18" r="2" />
        </svg>
      );
    case "airtable":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="4" height="4" />
          <rect x="9" y="3" width="4" height="4" />
          <rect x="15" y="3" width="4" height="4" />
          <rect x="3" y="9" width="4" height="4" />
          <rect x="9" y="9" width="4" height="4" />
          <rect x="15" y="9" width="4" height="4" />
          <rect x="3" y="15" width="4" height="4" />
          <rect x="9" y="15" width="4" height="4" />
          <rect x="15" y="15" width="4" height="4" />
        </svg>
      );
    default:
      return null;
  }
};
