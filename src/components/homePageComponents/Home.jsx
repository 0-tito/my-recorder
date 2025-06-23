import { Box, Button, Typography } from "@mui/material";
export default function Home({children}) {
  return (
      <> 
      <Typography variant="h4" >
        record your audio with ease and more...{" "}
      </Typography>
       {children}
      </>
  );
}
