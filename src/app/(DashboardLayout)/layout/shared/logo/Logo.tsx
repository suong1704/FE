import Link from "next/link";
import { Typography, styled, useTheme } from "@mui/material";
import Image from "next/image";
import logo from "../../../../../assets/SkillUp..png"

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  const theme = useTheme();
  
  return (
    <LinkStyled href="/all-module">
      <Image
        src={logo} // Replace with the actual path to your image
        alt="Logo"
        width={100}
        height={100}
      />
    </LinkStyled>
    // <Typography p={0.5} color={theme.palette.primary.main} variant="h1">SL</Typography>
  );
};

export default Logo;
