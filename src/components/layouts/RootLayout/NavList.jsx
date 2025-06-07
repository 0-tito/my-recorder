import { NavLink } from "react-router-dom"
import { Box,ListItem,Button,ListItemText } from "@mui/material"

export default function NavList({ home, about }){
    return   <Box display={"flex"}>
            <ListItem>
              <Button variant="contained" color="secondary" size="medium">
                <NavLink to={"/home"}>{home}</NavLink>
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="contained" size="medium">
                <NavLink to={"/"}>{about}</NavLink>
              </Button>
            </ListItem>
          </Box>
}