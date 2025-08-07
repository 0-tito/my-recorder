import { Grid } from "@mui/material";

// rerusable components
import AnimatedTitle from "../reuseableComponents/AnimatedTitle.jsx";
export default function Nav({ children}) {
  return (
    <Grid
      container
      component={"nav"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
      height={"25%"}
      marginBottom={"15px"}
    >
      <Grid item>
        <AnimatedTitle size={"55px"} weight={600} text={"ADAAT"} />
      </Grid>
      <Grid item>
        {children}
      </Grid>
    </Grid>
  );
}
