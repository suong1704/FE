'use client';
import { Box, Fab, Grid, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import Image from "next/image";
import img4 from "public/images/products/s11.jpg";
import { IconEdit } from '@tabler/icons-react';
import LessonCard from '@/components/LessonCard';

const ModuleDetail = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      {/* <Image
      src={img4}
      alt="img"
      style={{ width: "100%", height: "270px", borderRadius: "10px" }}
    /> */}
      <DashboardCard title="Detail"  action={
        <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
          <IconEdit width={24} />
        </Fab>
      } >
        <Box>
          <Typography variant='h2'>
            Module Name
          </Typography>
          <Typography mt={1} fontWeight={300} variant='h6'>
            Module Name
          </Typography>
          <Box m={1}>
          <Grid container spacing={3} mt={2}>

       {[11,1,1].map((lesson, index) => {

        return (<>
        <LessonCard key={index}/>
        </>)
       })}
          </Grid>

          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ModuleDetail;

