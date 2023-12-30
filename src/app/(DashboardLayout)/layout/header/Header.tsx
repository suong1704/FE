"use client"

import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";

import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import HeaderItems from "./HeaderItems";
import Logo from "../shared/logo/Logo";
import SchoolIcon from '@mui/icons-material/School';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAppSelector } from "@/store/hooks";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const user = useAppSelector(state => state.user.user);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    user &&
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <Logo />
        <Box flexGrow={1}>
          <HeaderItems />
        </Box>
        <Stack spacing={1} direction="row" alignItems="center">
          {
            user.authorities.find(a => a.authority === "Learner") &&
            <Chip
              label="Learner"
              icon={<SchoolIcon color="primary"/>}
            />
          }
          {
            user.authorities.find(a => a.authority === "Moderator") &&
            <Chip
              label="Moderator"
              icon={<Diversity1Icon color="warning"/>}
            />
          }
          {
            user.authorities.find(a => a.authority === "Admin") &&
            <Chip
              label="Admin"
              icon={<AdminPanelSettingsIcon color="error"/>}
            />
          }
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
