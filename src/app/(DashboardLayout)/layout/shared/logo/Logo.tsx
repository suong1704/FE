import Link from "next/link";
import { Typography, styled, useTheme } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  const theme = useTheme();
  
  return (
    // <LinkStyled href="/">
    
    // </LinkStyled>
    <Typography p={0.5} color={theme.palette.primary.main} variant="h1">SL</Typography>
  );
};

export default Logo;
