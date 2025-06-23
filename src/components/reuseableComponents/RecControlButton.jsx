import { Button } from "@mui/material";
export default function RecControlButton({content,handleClick, ...props}){
 return <Button onClick={handleClick} {...props}>{content}</Button>
}