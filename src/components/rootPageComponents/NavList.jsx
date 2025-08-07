import { Box,ListItem,Button } from "@mui/material"

export default function NavList({ children }){
    return    <Box display={"flex"} gap={"15px"}>
               {children}
          </Box>
}