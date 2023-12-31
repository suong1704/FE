import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useRouter } from "next/navigation";
import { useTheme } from "@emotion/react";
import { useAppDispatch } from "@/store/hooks";
import { handleLoginAsync } from "@/store/auth";
import Toast from "@/components/Toast";
import { handleToast } from "@/store/toast";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [username, setUserName] = useState("learner2");
  const [userNameError, setUserNameError] = useState<string>("");
  const [password, setPassword] = useState("123456");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserName(value);
    const regex = /^[a-zA-Z0-9]+$/;
    const isValid = regex.test(value);

    if (!isValid) {
      setUserNameError("Invalid userName.");
    } else if (value.length < 2) {
      setUserNameError("Username must be at least 2 characters");
    } else {
      setUserNameError("");
    }
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length < 4) {
      setPasswordError("Password must be at least 4 characters");
    } else {
      setPasswordError("");
    }
  };
  const handleLogin = () => {
    dispatch(handleLoginAsync({ username, password }))
      .then((res) => {
        console.log(res.payload.user);
        // router.push("/");
        if (res.payload.user) {
          router.push("/all-module");
        }
        else{
          dispatch(handleToast({
            open: true,
            status: "error",
            message: "Login fail",
          }));
        }
      })
      .catch((err) => {
        console.log("failed", err);
      });
  };
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            onChange={handleChangeUsername}
            value={username}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleChangePassword}
            value={password}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin}
          type="submit"
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
      <Toast />
    </>
  );
};

export default AuthLogin;
