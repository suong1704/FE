"use client";
import { Box, Button, ButtonBase, Fab, Grid, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import ModuleCard from "@/components/ModuleCard";
import { IconAd, IconPlus } from "@tabler/icons-react";
import ModalNewModule from "@/components/ModalNewModule";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleAllMyModule } from "@/store/module/action";

const MyModuleMPage = () => {
  const myModules = useAppSelector(state => state.module.myModules);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(handleAllMyModule());
  }, []);

  return (
    <PageContainer title={`My Modules (${myModules.length})`} description="this is Sample page">
      <DashboardCard
        title={`My Modules (${myModules.length})`}
        action={
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<IconPlus fontSize={"small"} />}>
            New Module
          </Button>
        }>
        <Box>
          <Grid container spacing={3}>
            {
              myModules.map((m) => {
                return <ModuleCard key={m.moduleId} module={m}/>;
              })
            }
          </Grid>
          <ModalNewModule open={open} handleClose={handleClose} />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default MyModuleMPage;
