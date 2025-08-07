import { Box } from "@mui/material";

const GlassyMicSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 200"
      width="480"
      height="200"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#FAF9F6" />
        </linearGradient>

        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="30%" stopColor="#90caff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#007BFF" stopOpacity="0.9" />
        </linearGradient>

        <radialGradient id="micGlow" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="url(#circleGradient)"
        strokeWidth="4"
      />

      <ellipse
        cx="32"
        cy="20"
        rx="10"
        ry="12"
        fill="url(#glassGradient)"
        filter="url(#shadow)"
      />

      <ellipse cx="32" cy="20" rx="10" ry="12" fill="url(#micGlow)" />

      <rect
        x="29"
        y="32"
        width="6"
        height="14"
        rx="3"
        fill="#007BFF"
        filter="url(#shadow)"
      />

      <rect x="30" y="44" width="4" height="4" fill="#007BFF" />

      <rect x="26" y="48" width="12" height="2" rx="1" fill="#007BFF" />
    </svg>
  );
};

export default function GlassyMicIcon(){
     return <Box>
      <GlassyMicSvg />
     </Box>
}

