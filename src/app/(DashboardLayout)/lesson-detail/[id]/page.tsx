'use client';
import { FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useAppSelector } from '@/store/hooks';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ListQuest from '../components/ListQuest';

const LessonDetail = () => {
  const lesson = useAppSelector(state => state.detailLesson.lesson!);
  const [mode, setMode] = useState<"modify" | "preview">("preview");
  const [lessonMod, setLessonMod] = useState({...lesson});

  const saveHandler = () => {
    console.log(lessonMod);
  };

  return (
    lesson &&
    <PageContainer title="Sample Page" description="this is Sample page">
      <Stack direction="row" justifyContent="flex-end" spacing={2} marginBottom={2}>
        <Button variant='contained' color={mode == "preview" ? "warning" : "secondary"} onClick={(e) => {
          setMode((m) => {
            if(m == 'modify'){
              saveHandler();
              return "preview";
            }
            else{
              return "modify";
            }
          })
        }}>
          <Typography>{mode == "preview" ? "Modify" : "Save"}</Typography>
        </Button>
        {
          mode == "preview"
          &&
          <Button variant='outlined' color='error'>DELETE</Button>
        }
        {
          mode == "modify"
          &&
          <Button variant='outlined' color='error' onClick={() => {
            setMode("preview");
          }}>CANCEL</Button>
        }
      </Stack>
      <DashboardCard>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems={"center"} paddingBottom={3}>
            <Typography variant='h2'>
              {mode == 'modify' ? "Modifying" : "Preview"}
            </Typography>
            {
              mode == "modify" ?
              <CreateIcon color="warning"/>
              :
              <RemoveRedEyeIcon color='secondary'/>
            }
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant='h3'>{lesson.title}</Typography>
            {
              mode == "modify"
              &&
              <TextField variant='standard' size="small" placeholder='New title...'
                onChange={(e) => {
                  setLessonMod((prev) => {
                    return {
                      ...prev,
                      title: e.target.value
                    };
                  })
                }}
                value={lessonMod.title}
              />
            }
          </Stack>
          <Stack spacing={2}>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant='h4'>Listening Content</Typography>
              <HeadphonesIcon />
            </Stack>
            <Stack paddingLeft={2} direction="row" spacing={2} alignItems="center">
              <Typography variant='h6'>{lesson.listeningContent.audioUrl}</Typography>
              {
                mode == "modify"
                &&
                <TextField variant='standard' size="small" placeholder='New audio url...'
                  onChange={(e) => {
                    setLessonMod((prev) => {
                      return {
                        ...prev,
                        listeningContent: {
                          ...prev.listeningContent,
                          audioUrl: e.target.value
                        }
                      };
                    })
                  }}
                  value={lessonMod.listeningContent.audioUrl}
                />
              }
            </Stack>
            <Stack paddingLeft={2} direction="row" spacing={1} alignItems="center">
              <Typography variant='h5'>Questions</Typography>
              <QuestionMarkIcon />
            </Stack>
            <ListQuest mode={mode} questions={lessonMod.listeningContent.listQuestion} setLessonMod={setLessonMod}/>
          </Stack>
        </Stack>
      </DashboardCard>
    </PageContainer>
  );
};

export default LessonDetail;
