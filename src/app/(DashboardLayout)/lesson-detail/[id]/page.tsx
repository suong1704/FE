'use client';
import { Stack, TextField, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import UploadIcon from '@mui/icons-material/Upload';
import SpeakerIcon from '@mui/icons-material/Speaker';
import ListQuest from '../components/ListQuest';
import { deleteLessonThunk, updateLessonThunk } from '@/store/lesson/detailLessonSlice';
import { handleToast } from '@/store/toast';
import MyDialog from '@/components/MyDialog';
import { useRouter, useSearchParams } from 'next/navigation';
import NewQuesForm from '../components/NewQuesForm';
import { uploadAudioThunk } from '@/store/firebase/storageFireBaseSlice';
import { loadAudioPromise } from '@/utils/firebaseDownloadUtil';

const LessonDetail = () => {
  const lesson = useAppSelector(state => state.detailLesson.lesson!);
  const [mode, setMode] = useState<"modify" | "preview">("preview");
  const [lessonMod, setLessonMod] = useState({...lesson});
  const dispatch = useAppDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openNewQuesForm, setOpenNewQuesForm] = useState(false);
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const isMyModule = parseInt(searchParams.get("isMyModule")!);

  const fileInputRef = useRef<any>();
  const fileInputRef2 = useRef<any>();
  const storageFireBase = useAppSelector(state => state.storageFireBase);
  const [listenSrc, setListenSrc] = useState("");
  const [speakSrc, setSpeakSrc] = useState("");

  const handleOnChangeFile = () => {
    const inputElement = fileInputRef.current;
    const file = inputElement.files[0];
    inputElement.value = "";
    dispatch(uploadAudioThunk(
      lessonMod.listeningContent.audioUrl,
      lessonMod.lessonId,
      "listen",
      file,
      (url) => {
        setLessonMod((prev) => {
          return {
            ...prev,
            listeningContent: {
              ...prev.listeningContent,
              audioUrl: url
            }
          };
        })
      }
    ));
  }

  const handleOnChangeFile2 = () => {
    const inputElement = fileInputRef2.current;
    const file = inputElement.files[0];
    inputElement.value = "";
    dispatch(uploadAudioThunk(
      lessonMod.speakingContent.audioUrl,
      lessonMod.lessonId,
      "speak",
      file,
      (url) => {
        setLessonMod((prev) => {
          return {
            ...prev,
            speakingContent: {
              ...prev.speakingContent,
              audioUrl: url
            }
          };
        })
      }
    ));
  }

  useEffect(() => {
    loadAudioPromise(storageFireBase, "lesson/" + lessonMod.listeningContent.audioUrl)
    .then((res) => {
      setListenSrc(res.src);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [lessonMod.listeningContent.audioUrl])

  useEffect(() => {
    loadAudioPromise(storageFireBase, "lesson/" + lessonMod.speakingContent.audioUrl)
    .then((res) => {
      setSpeakSrc(res.src);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [lessonMod.speakingContent.audioUrl])

  const saveHandler = () => {
    console.log("save");
    console.log(lessonMod);
    dispatch(handleToast({
      open: true,
      status: "warning",
      message: "Saving...",
    }));
    dispatch(updateLessonThunk(lessonMod, () => {
      dispatch(handleToast({
        open: true,
        status: "success",
        message: "Saved",
      }));
    }));
  };

  const deleteHandler = () => {
    dispatch(handleToast({
      open: true,
      status: "warning",
      message: "deleting...",
    }));
    dispatch(deleteLessonThunk(lessonMod, () => {
      dispatch(handleToast({
        open: true,
        status: "success",
        message: "Deleted",
      }));
      router.back();
    }));
  }

  useEffect(() => {
    if(lessonMod.listeningContent.listQuestion.length != lesson.listeningContent.listQuestion.length){
      saveHandler();
    }
    if(lessonMod.listeningContent.audioUrl != lesson.listeningContent.audioUrl){
      console.log("save listen");
      saveHandler();
    }
    if(lessonMod.speakingContent.audioUrl != lesson.speakingContent.audioUrl){
      console.log("save speak");
      saveHandler();
    }
  }, [lessonMod.listeningContent.listQuestion.length, lessonMod.listeningContent.audioUrl, lessonMod.speakingContent.audioUrl])

  return (
    lesson &&
    <PageContainer title={lesson.title} description="this is Sample page">
      <Stack direction="row" justifyContent="flex-end" spacing={2} marginBottom={2}>
        {
        isMyModule ?
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
        :
        <></>
        }
        {
          isMyModule ?
          (
          mode == "preview"
          &&
          <>
            <Button variant='outlined' color='error'
              onClick={() => {
                setOpenDeleteDialog(true);
            }}>
              DELETE
            </Button>
            <MyDialog 
              title='DELETE'
              mes='Do you want delete this lesson?'
              open={openDeleteDialog}
              handleClose={() => {
                setOpenDeleteDialog(false);
              }}
              onAgree={() => {
                setOpenDeleteDialog(false);
                deleteHandler();
              }}
            />
          </>
          )
          :
          <></>
        }
        {
          mode == "modify"
          &&
          <Button variant='outlined' color='error' onClick={() => {
            setMode("preview");
            setLessonMod({...lesson});
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
            <Stack paddingLeft={2} direction="row" spacing={1} alignItems="center">
              {
                !listenSrc ?
                <Typography variant='h6' color="red">Dont have listen audio</Typography>
                :
                <audio controls src={ listenSrc } />
              }
              {
                mode == "modify"
                &&
                <Button onClick={() => { fileInputRef.current.click(); }}>
                  <UploadIcon />
                  <input ref={fileInputRef} style={{display: "none"}}
                    type="file"onChange={() => { handleOnChangeFile(); }}/>
                </Button>
                // <TextField variant='standard' size="small" placeholder='New audio url...'
                //   onChange={(e) => {
                //     setLessonMod((prev) => {
                //       return {
                //         ...prev,
                //         listeningContent: {
                //           ...prev.listeningContent,
                //           audioUrl: e.target.value
                //         }
                //       };
                //     })
                //   }}
                //   value={lessonMod.listeningContent.audioUrl}
                // />
              }
            </Stack>
            <Stack paddingLeft={2} direction="row" spacing={1} alignItems="center">
              <Typography variant='h5'>Questions</Typography>
              <QuestionMarkIcon />
              {
                isMyModule ?
                <Button variant='outlined' onClick={() => {
                  setOpenNewQuesForm(true);
                }}>Add more</Button>
                :
                <></>
              }
              <NewQuesForm open={openNewQuesForm}
                handleClose={() => { setOpenNewQuesForm(false) }}
                handleAdd={(newQuest) => {
                  setLessonMod(prev => {
                    return {
                      ...prev,
                      listeningContent: {
                        ...prev.listeningContent,
                        listQuestion: [
                          ...prev.listeningContent.listQuestion,
                          newQuest
                        ]
                      }
                    }
                  });
                  setOpenNewQuesForm(false);
                }}
              />
            </Stack>
            <ListQuest mode={mode} questions={lessonMod.listeningContent.listQuestion} setLessonMod={setLessonMod}/>
          
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant='h4'>Speaking Content</Typography>
              <SpeakerIcon />
            </Stack>
            <Stack paddingLeft={2} direction="row" spacing={1} alignItems="center">
              {
                !speakSrc ?
                <Typography variant='h6' color="red">Dont have speak audio</Typography>
                :
                <audio controls src={ speakSrc } />
              }
              {
                mode == "modify"
                &&
                <Button onClick={() => { fileInputRef2.current.click(); }}>
                  <UploadIcon />
                  <input ref={fileInputRef2} style={{display: "none"}}
                    type="file"onChange={() => { handleOnChangeFile2(); }}/>
                </Button>
                // <TextField variant='standard' size="small" placeholder='New audio url...'
                //   onChange={(e) => {
                //     setLessonMod((prev) => {
                //       return {
                //         ...prev,
                //         listeningContent: {
                //           ...prev.listeningContent,
                //           audioUrl: e.target.value
                //         }
                //       };
                //     })
                //   }}
                //   value={lessonMod.listeningContent.audioUrl}
                // />
              }
            </Stack>
            <Stack spacing={2} alignItems="flex-start">
              <Typography variant='h6' align='left'>{lesson.speakingContent.content}</Typography>
              {
                mode == "modify"
                &&
                <TextField variant='standard' size="small" placeholder='New title...'
                  fullWidth multiline
                  onChange={(e) => {
                    setLessonMod((prev) => {
                      return {
                        ...prev,
                        speakingContent: {
                          ...prev.speakingContent,
                          content: e.target.value
                        }
                      };
                    })
                  }}
                  value={lessonMod.speakingContent.content}
                />
              }
            </Stack>
          
          </Stack>
        </Stack>
      </DashboardCard>
    </PageContainer>
  );
};

export default LessonDetail;
