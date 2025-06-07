import { Typography } from "@mui/material"
export default function() {
 return <Typography
  sx={{
    position: "relative",
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: 700,
    color: "black",
    textShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(12px)",
    background: "rgba(255, 255, 255, 0.05)",
    padding: "1.5rem",
    borderRadius: "1rem",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
    transformStyle: "preserve-3d",
    perspective: "1000px",
    
  }}
>
  As my first project in audio development, this recorder is designed to
  explore how multiple audio clips can be combined into a single, cohesive
  track—laying the foundation for more advanced audio tools in the future.
</Typography>

 


}
