"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const SamplePage = () => {
  return (
    <PageContainer title="My Learning" description="this is My Learning">
      <DashboardCard title="My Learning">
        <Typography>This is a My Learning</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
