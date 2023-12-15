'use client';
import { Box, Fab, Grid, Stack, TextField, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import Image from "next/image";
import img4 from "public/images/products/s11.jpg";
import { IconEdit, IconRowRemove, IconOctagonOff, IconBrandStripe } from '@tabler/icons-react';
import LessonCard from '@/components/LessonCard';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { updateModuleThunk } from '@/store/module';
import { handleToast } from '@/store/toast';

const ModuleDetail = ({ params }: { params: { id: number } }) => {
  const searchParams = useSearchParams();
  const isMyModule = parseInt(searchParams.get("isMyModule")!);
  const myModules = useAppSelector(state => state.module.myModules);
  const module = isMyModule ? myModules.find(m => m.moduleId == params.id) : undefined;

  const [mode, setMode] = useState<"modify" | "preview">("preview");
  const [moduleMod, setModuleMod] = useState({...module!});
  const dispatch = useAppDispatch();

  const updateModule = () => {
    console.log("updateModule");
    dispatch(handleToast({
      open: true,
      status: "warning",
      message: "Saving...",
    }));
    dispatch(updateModuleThunk(moduleMod, () => {
      dispatch(handleToast({
        open: true,
        status: "success",
        message: "Saved",
      }));
    }));
  }

  return (
    module &&
    <PageContainer title={module.title} description="this is Sample page">
      {/* <Image
      src={img4}
      alt="img"
      style={{ width: "100%", height: "270px", borderRadius: "10px" }}
    /> */}
      <DashboardCard title={module.title}  action={
        mode == "preview"
        ?
        <Stack direction={"row"} spacing={1}>
          <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}
            onClick={() => {
              setMode((m) => {
                if(m == 'modify'){
                  //saveHandler();
                  return "preview";
                }
                else{
                  return "modify";
                }
              })
            }}>
            <IconEdit width={24} />
          </Fab>
          <Fab color="error" size="medium">
            <IconRowRemove width={24}/>
          </Fab>
        </Stack>
        :
        <Stack direction={"row"} spacing={1}>
          <Fab color="warning" size="medium" sx={{color: '#ffffff'}}
            onClick={() => {
              updateModule();
              setMode("preview");
            }}>
            <IconBrandStripe width={24} />
          </Fab>
          <Fab color="error" size="medium" sx={{color: '#ffffff'}}
            onClick={() => {
              setModuleMod({...module});
              setMode("preview");
            }}>
            <IconOctagonOff width={24} />
          </Fab>
        </Stack>

      } >
        <Box>
          {
            mode == "modify"
            &&
            <Stack width={"fit-content"} marginBottom={5} marginTop={-4}>
              <TextField variant='standard' size="small" placeholder='New title...'
                onChange={(e) => {
                  setModuleMod((prev) => {
                    return {
                      ...prev,
                      title: e.target.value
                    }
                  });
                }}
                value={moduleMod.title}
              />
            </Stack>
          }
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography variant='h6'>
              {module.description}
            </Typography>
            {
              mode == "modify"
              &&
              <TextField variant='standard' size="small" placeholder='New description...'
                onChange={(e) => {
                  setModuleMod((prev) => {
                    return {
                      ...prev,
                      description: e.target.value
                    }
                  });
                }}
                value={moduleMod.description}
              />
            }
          </Stack>
          
          <Typography mt={1} fontWeight={300} variant='h6'>
            Total lesson: {module.lessons.length}
          </Typography>
          <Box m={1}>
          <Grid container spacing={3} mt={2}>
            {
              module.lessons.map((l => {
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

