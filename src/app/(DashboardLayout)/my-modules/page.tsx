"use client";
import { Box, Button, ButtonBase, Fab, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import ModuleCard from "@/components/ModuleCard";
import { IconAd, IconPlus } from "@tabler/icons-react";
import ModalNewModule from "@/components/ModalNewModule";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleAllMyModule } from "@/store/module/action";
import { InitialState, updateFilter } from "@/store/module";

const MyModuleMPage = () => {
  const myModules = useAppSelector(state => state.module.myModules);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const filter = useAppSelector(state => state.module.filter);

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
        }
      >
        <Box>

          <Stack direction="row" spacing={2} alignItems={"center"} width={"fit-content"}
            marginTop={2} marginBottom={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter"
                onChange={(e) => { dispatch(updateFilter(e.target.value as InitialState["filter"])) }}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"published"}>Published</MenuItem>
                <MenuItem value={"unPulished"}>UnPublished</MenuItem>
                <MenuItem value={"deleted"}>Deleted</MenuItem>
              </Select>
            </FormControl>
            
          </Stack>

          <Grid container spacing={3}>
            {
              myModules.map((m: any) => {
                if(filter == "all"){
                  return <ModuleCard key={m.moduleId} module={m}/>;
                }
                if(filter == "published" && m.published && !m.deleted){
                  return <ModuleCard key={m.moduleId} module={m}/>;
                }
                if(filter == "unPulished" && !m.published && !m.deleted){
                  return <ModuleCard key={m.moduleId} module={m}/>;
                }
                if(filter == "deleted" && m.deleted){
                  return <ModuleCard key={m.moduleId} module={m}/>;
                }
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
