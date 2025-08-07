import { Button } from "@mui/material";

export default function PlayBackButton({children, handleClick,isDisabled = false, sx = {}}) {
  return (
    <Button
      variant="outlined"
      onClick={(e) => {
        !isDisabled?  handleClick() :
         e.preventDefault()
      }}
      disabled={isDisabled}
        sx={{  
        opacity: isDisabled ? 0.5 : 1,  
        pointerEvents: isDisabled ? "none" : "auto", 
        textTransform: "capitalize",
        borderRadius: 2,
        px: 2,
        boxShadow: 1,
        transition: "all 0.2s ease-in-out",
        '&:hover': {
          transform: "scale(1.05)",
        },
        ...sx,                 
      }}
    >
    {children}
    </Button>
  );
}
