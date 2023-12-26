import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { Module } from "@/store/module";
import {
  Avatar,
  Box,
  CardContent,
  Fab,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { IconArrowBadgeRightFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import img1 from "public/images/products/s4.jpg";

const ModuleCard = ({ module }: { module: Module }) => {
  const router = useRouter();

  return (
    <Grid item xs={12} md={4} lg={3}>
      <Tooltip title={"View Detail  "}>
        <Box
          onClick={() => {
            router.push(`module-detail/${module.moduleId}?isMyModule=1`);
          }}>
          <BlankCard>
            <CardContent sx={{ p: 3, pt: 2, height: "120px" }}>
              <Typography variant="h6">{module.title}</Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={1}>
                <Stack direction="row" alignItems="center">
                  <Typography>{module.description}</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </BlankCard>
        </Box>
      </Tooltip>
    </Grid>
  );
};

export default ModuleCard;
