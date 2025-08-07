import { Box } from "@mui/material";

const MyAudioRecorderLogo = () => (
  <svg width="480" height="100" viewBox="0 0 480 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Text gradient */}
      <linearGradient id="gradientText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00c6ff" />
        <stop offset="100%" stopColor="#0072ff" />
      </linearGradient>

      {/* Shadow filter */}
      <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="black" floodOpacity="0.3" />
      </filter>

      {/* Text pop-out filter (like pulling forward) */}
      <filter id="pop" x="-50%" y="-50%" width="200%" height="200%">
        <feOffset in="SourceAlpha" dx="0" dy="-2" result="offset"/>
        <feGaussianBlur in="offset" stdDeviation="1.5" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      {/* Wavy path for text */}
      <path id="wavyPath" fill="none" d="M10,60 Q 90,20 170,60 T 330,60 T 450,60" />

      {/* Moving gradient light beam */}
      <linearGradient id="lightBeam" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="50%" stopColor="white" stopOpacity="0.8" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>

    {/* Normal text (behind) */}
    <text
      fontSize="28"
      fontFamily="Verdana, Geneva, sans-serif"
      fill="url(#gradientText)"
      filter="url(#textShadow)"
    >
      <textPath href="#wavyPath">
        ADAAT
      </textPath>
    </text>

    {/* Text that pops out when beam passes */}
    <text
      fontSize="28"
      fontFamily="Verdana, Geneva, sans-serif"
      fill="white"
      filter="url(#pop)"
      opacity="0.5"
      clipPath="url(#beamClip)"
    >
      <textPath href="#wavyPath">
        ADAAT
      </textPath>
    </text>

    {/* Animated beam mask (clipPath) */}
    <clipPath id="beamClip">
      <rect x="-60" y="0" width="60" height="100">
        <animate
          attributeName="x"
          from="-60"
          to="540"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
    </clipPath>

    {/* Visible moving light beam on top */}
    <rect x="-60" y="0" width="60" height="100" fill="url(#lightBeam)">
      <animate
        attributeName="x"
        from="-60"
        to="540"
        dur="3s"
        repeatCount="indefinite"
      />
    </rect>

    {/* Recording symbol */}
    <g transform="translate(455, 55)">
      <circle r="8" fill="red">
        <animate attributeName="r" values="8;10;8" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <text x="12" y="5" fontFamily="Arial" fontSize="12" fill="red">REC</text>
    </g>
  </svg>
);



export default function Logo() {
    return <Box  >
      <MyAudioRecorderLogo />
    </Box>
}