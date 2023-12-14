
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
import { Lesson } from "@/store/lesson";

const LessonCard = ({lesson}: { lesson: Lesson }) => {
  const router = useRouter();
  const id = 'uniqueId'
  
  return (
    <Grid item xs={12} md={6} lg={6}>
      <Box component={Link}  href={`/lesson-detail/${lesson.lessonId}`} passHref>
        <BlankCard >
          <CardContent sx={{ p: 3, pt: 2, display:"flex", justifyContent:"space-between" }}>
            <Typography variant="h6" >{lesson.title}</Typography>
            <IconGradienter/>
          </CardContent>
        </BlankCard>
      </Box>
    </Grid>
  );
};

export default LessonCard;
