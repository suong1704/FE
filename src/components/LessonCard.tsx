
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
  Button,
} from "@mui/material";
import { IconArrowBadgeRightFilled, IconGradienter } from "@tabler/icons-react";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { useRouter } from "next/navigation";

import { uniqueId } from "lodash";
import { useDispatch } from "react-redux";
import { updateDetailLesson } from "@/store/lesson/detailLessonSlice";
import { Lesson } from "@/store/lesson";
import { Module } from "@/store/module";
import { useAppDispatch } from "@/store/hooks";
import { updateLearnLesson } from "@/store/learn/learnSlice";

const LessonCard = ({lesson, isMyModule, moudule}: { lesson: Lesson, isMyModule: number, moudule: Module}) => {
  const router = useRouter();
  const id = 'uniqueId'
  const dispatch = useAppDispatch();
  
  return (
    <Grid item xs={12} md={6} lg={6}>
      <Box component={Link}  href={`/lesson-detail/${lesson.lessonId}?isMyModule=${isMyModule}`} passHref
        onClick={(e) => { dispatch(updateDetailLesson(lesson)) }}>
        <BlankCard >
          <CardContent sx={{ p: 3, pt: 2, display:"flex", justifyContent:"space-between", alignItems: "center" }}>
            <Typography variant="h6" >{lesson.title}</Typography>
            {
              moudule.published && !moudule.deleted &&
              <Button variant="outlined" onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                router.push("/learn");
                dispatch(updateLearnLesson(lesson));
              }}>Learn</Button>
            }
            <IconGradienter/>
          </CardContent>
        </BlankCard>
      </Box>
    </Grid>
  );
};

export default LessonCard;
