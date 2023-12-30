import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Stack,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser, IconPassword } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { loadImagePromise } from "@/utils/firebaseDownloadUtil";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import CloseIcon from '@mui/icons-material/Close';
import { cancelModeratorRequestThunk, createModeratorRequestThunk, getModeratorRequestThunk } from "@/store/moderatorRequest/moderatorRequestSlice";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const router = useRouter();

  const user = useAppSelector(state => state.user.user);
  const storageFireBase = useAppSelector(state => state.storageFireBase);
  const [avSrc, setAvSrc] = useState("");

  const requesting = useAppSelector(state => state.moderatorRequest.requesting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!user) return;

    loadImagePromise(storageFireBase, "avatar/" + user.avatarUrl)
    .then((res) => {
        setAvSrc(res.src);
    })
    .catch((err) => {
      console.log(err);
    })

    return () => {
      console.log('unmount');
    }

}, [user?.avatarUrl])

  useEffect(() => {
    if(!user) return;
    if(user.authorities.find(a => a.authority === "Learner")){
      dispatch(getModeratorRequestThunk());
    }
  }, [user])

  return (
    user &&
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={avSrc ? avSrc : "/images/profile/user-1.jpg"}
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem onClick={() => {
          router.push("/user");
        }}>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>
            My Profile
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {
          router.push("/authentication/changePassword");
        }}>
          <ListItemIcon>
            <IconPassword width={20} />
          </ListItemIcon>
          <ListItemText>
            Change Password
          </ListItemText>
        </MenuItem>

        {
          user.authorities.find(a => a.authority === "Learner") &&
          (
            !requesting ?
            <MenuItem onClick={() => {
              dispatch(createModeratorRequestThunk());
            }}>
              <ListItemIcon>
                <Diversity1Icon width={20} />
              </ListItemIcon>
              <ListItemText>
                Become Moderator
              </ListItemText>
            </MenuItem>
            :
            <MenuItem onClick={() => {
              dispatch(cancelModeratorRequestThunk());
            }}>
              <ListItemIcon>
                <Diversity1Icon width={20} />
              </ListItemIcon>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <ListItemText>
                  Requesting...
                </ListItemText>
                <CircularProgress color="secondary" size="1rem"/>
              </Stack>
            </MenuItem>
          )
        }
        
        <Box mt={1} py={1} px={2}>
          <Button
            href="/authentication/login"
            variant="outlined"
            color="primary"
            onClick={() => {localStorage.clear()}}
            component={Link}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
