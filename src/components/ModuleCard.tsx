
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { Module } from "@/store/module";
import {
  Avatar,
  Box,
  CardContent,
  Fab,
  Grid,
  Tooltip,
  Typography
} from "@mui/material";
import { Stack } from "@mui/system";
import { IconArrowBadgeRightFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import img1 from "public/images/products/s4.jpg";

const ModuleCard = ({ module }: { module: Module }) => {
  const router = useRouter();

  return (
    <Grid item xs={12} md={4} lg={3} >
       <Tooltip title={'View Detail  '}>
         <Box onClick={() => { router.push(`module-detail/${module.moduleId}?isMyModule=1`) }}>
        <BlankCard >
          {/* <Typography component={Link} href="/"> */}
          <Image
            src={img1}
            alt="img"
            style={{ width: "100%", height: "144px",objectFit: "cover"  }}
          />
          {/* </Typography> */}
         
            <Fab
              size="small"
              color="primary"
              sx={{ bottom: "75px", right: "15px", position: "absolute" }}
            >
              <IconArrowBadgeRightFilled size="16" />
              <Avatar sx={{}}>V</Avatar>
            </Fab>
     
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Typography variant="h6">{module.title}</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
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
