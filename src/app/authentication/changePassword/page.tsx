"use client";
import { Grid, Box, Card, Typography, Stack, useTheme } from "@mui/material";
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthChangePassword from "../auth/AuthChangePassword";
import { useRouter } from "next/navigation";

const Register2 = () => {
  const theme = useTheme();
    const router = useRouter();

  return (
    <PageContainer title="Change password" description="this is change password page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}>
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography
                  p={0.5}
                  color={theme.palette.primary.main}
                  variant="h1">
                  Change Password
                </Typography>
              </Box>
              <AuthChangePassword
                subtitle={
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={1}
                    mt={3}>
                    <Typography
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                      onClick={() => {
                        router.back();
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Back
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Register2;