import { Box,Typography } from "@mui/material";

// const MyAudioRecorderLogo = () => (
//   <svg  viewBox="0 0 480 100" xmlns="http://www.w3.org/2000/svg">
//     <defs>
//       {/* Text gradient */}
//       <linearGradient id="gradientText" x1="0%" y1="0%" x2="100%" y2="0%">
//         <stop offset="0%" stopColor="#00c6ff" />
//         <stop offset="100%" stopColor="#0072ff" />
//       </linearGradient>

//       {/* Shadow filter */}
//       <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
//         <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="black" floodOpacity="0.3" />
//       </filter>

//       {/* Text pop-out filter (like pulling forward) */}
//       <filter id="pop" x="-50%" y="-50%" width="200%" height="200%">
//         <feOffset in="SourceAlpha" dx="0" dy="-2" result="offset"/>
//         <feGaussianBlur in="offset" stdDeviation="1.5" result="blur"/>
//         <feMerge>
//           <feMergeNode in="blur"/>
//           <feMergeNode in="SourceGraphic"/>
//         </feMerge>
//       </filter>

//       {/* Wavy path for text */}
//       <path id="wavyPath" fill="none" d="M10,60 Q 90,20 170,60 T 330,60 T 450,60" />

//       {/* Moving gradient light beam */}
//       <linearGradient id="lightBeam" x1="0" y1="0" x2="1" y2="0">
//         <stop offset="0%" stopColor="transparent" />
//         <stop offset="50%" stopColor="white" stopOpacity="0.8" />
//         <stop offset="100%" stopColor="transparent" />
//       </linearGradient>
//     </defs>

//     {/* Normal text (behind) */}
//     <text
//       fontSize="28"
//       fontFamily="Verdana, Geneva, sans-serif"
//       fill="url(#gradientText)"
//       filter="url(#textShadow)"
//     >
//       <textPath href="#wavyPath">
//         ADAAT
//       </textPath>
//     </text>

//     {/* Text that pops out when beam passes */}
//     <text
//       fontSize="28"
//       fontFamily="Verdana, Geneva, sans-serif"
//       fill="white"
//       filter="url(#pop)"
//       opacity="0.5"
//       clipPath="url(#beamClip)"
//     >
//       <textPath href="#wavyPath">
//         ADAAT
//       </textPath>
//     </text>

//     {/* Animated beam mask (clipPath) */}
//     <clipPath id="beamClip">
//       <rect x="-60" y="0" width="60" height="100">
//         <animate
//           attributeName="x"
//           from="-60"
//           to="540"
//           dur="3s"
//           repeatCount="indefinite"
//         />
//       </rect>
//     </clipPath>
//   </svg>
// );



export default function Logo() {
  return  <Box>
<Typography
  sx={{
    fontSize: { xs: "50px", sm: "50px" },
    fontFamily: "Verdana, Geneva, sans-serif",
    fontWeight: "bold",
    display: "inline-block",
    background: "linear-gradient(90deg, #00c6ff, #ffffff, #0072ff)",
    backgroundSize: "300%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "shine 3s linear infinite",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    transform: "rotate(-1deg) skewY(-1deg)", // Fake wavey effect
    "@keyframes shine": {
      "0%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
      "100%": { backgroundPosition: "0% 50%" },
    },
  }}
>
  ADAAT
</Typography>

     </Box>
}