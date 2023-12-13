
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
  Avatar,
  Box,
} from "@mui/material";
import { IconArrowBadgeRightFilled, IconGradienter } from "@tabler/icons-react";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { useRouter } from "next/navigation";

interface Module {

  name: string,
  desc: string,
  author: string
}

import { uniqueId } from "lodash";
const LessonCard = () => {
  const router = useRouter();
  const id = 'uniqueId'
  return (
    <Grid item xs={12} md={6} lg={6}>
      <Box component={Link}  href={`/lesson-detail/${id}`} passHref>
        <BlankCard >
          <CardContent sx={{ p: 3, pt: 2, display:"flex", justifyContent:"space-between" }}>
            <Typography variant="h6" >Lesson Name</Typography>
            <IconGradienter/>
          </CardContent>
        </BlankCard>
      </Box>
    </Grid>
  );
};

export default LessonCard;
