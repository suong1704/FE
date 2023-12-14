'use client';
import { Box, Fab, Grid, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import Image from "next/image";
import img4 from "public/images/products/s11.jpg";
import { IconEdit } from '@tabler/icons-react';
import LessonCard from '@/components/LessonCard';
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

const ModuleDetail = ({ params }: { params: { id: number } }) => {
  const searchParams = useSearchParams();
  const isMyModule = parseInt(searchParams.get("isMyModule")!);
  const myModules = useAppSelector(state => state.module.myModules);
  const module = isMyModule ? myModules.find(m => m.moduleId == params.id) : undefined;

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      {/* <Image
      src={img4}
      alt="img"
      style={{ width: "100%", height: "270px", borderRadius: "10px" }}
    /> */}
      <DashboardCard title={module?.title}  action={
        <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
          <IconEdit width={24} />
        </Fab>
      } >
        <Box>
          <Typography variant='h6'>
            {module?.description}
          </Typography>
          <Typography mt={1} fontWeight={300} variant='h6'>
            Total lesson: {module?.lessons.length}
          </Typography>
          <Box m={1}>
          <Grid container spacing={3} mt={2}>
            {
              module?.lessons.map((l => {
                return (
                  <LessonCard key={l.lessonId} lesson={l}/>
                );
              }))
            }
          </Grid>
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ModuleDetail;

