 import { Typography } from "@mui/material";

export default function AnimatedTitle({text,weight,size,wavy}) {

<Typography
  sx={{
    fontSize: `${size}`,
    fontFamily: "Verdana, Geneva, sans-serif",
    fontWeight: `${weight}`,
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
  {text}
</Typography>

}