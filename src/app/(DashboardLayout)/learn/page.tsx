'use client';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { Button, CircularProgress, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useState, useEffect, useRef } from "react";
import { loadAudioPromise } from "@/utils/firebaseDownloadUtil";
import SpeakerIcon from '@mui/icons-material/Speaker';
import MicIcon from '@mui/icons-material/MicOutlined';
import { Question } from "@/store/lesson";
import { submitThunk } from "@/store/learn/learnSlice";

export default function LearnPage(){
    const lesson = useAppSelector(state => state.learn.lesson!);
    const [submit, setSubmit] = useState(false);
    const [listenResult, setListenResult] = useState<(number)[]>(
        lesson.listeningContent.listQuestion.map(m => 0)
    );

    const storageFireBase = useAppSelector(state => state.storageFireBase);
    const [listenSrc, setListenSrc] = useState("");
    const [speakSrc, setSpeakSrc] = useState("");

    const [micStatus, setMicStatus] = 
    useState<"request" | "notSuport" | "notOpen" | "opening">("request");
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | undefined>(undefined);
    const [recordState, setRecordState] = useState<undefined | "recording">();
    const chunks = useRef<any[]>([]);
    const [rc, setRc] = useState("");

    const [speakAnswer, setSpeakAnswer] = useState<File>();
    const dispatch = useAppDispatch();
    const [submiting, setSubmiting] = useState(false);

    const [fresult, setFResult] = useState<{
        scoreSpeaking: number,
        context: string,
        script: string
    }>();

    useEffect(() => {
        loadAudioPromise(storageFireBase, "lesson/" + lesson.listeningContent.audioUrl)
        .then((res) => {
          setListenSrc(res.src);
        })
        .catch((err) => {
          console.log(err);
        })
    }, [lesson.listeningContent.audioUrl])

    useEffect(() => {
        loadAudioPromise(storageFireBase, "lesson/" + lesson.speakingContent.audioUrl)
        .then((res) => {
          setSpeakSrc(res.src);
        })
        .catch((err) => {
          console.log(err);
        })
    }, [lesson.speakingContent.audioUrl])

    useEffect(() => {
        if(micStatus != "request") return;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported.");
            setMicStatus("opening");

            navigator.mediaDevices
            .getUserMedia(
                {
                  audio: true,
                },
            )
            .then((stream) => {
                const m = new MediaRecorder(stream);
                setMediaRecorder(m);
                m.ondataavailable = (e) => {
                    chunks.current.push(e.data);
                }
                m.onstop = () => {
                    const blob = new Blob(chunks.current, { type: "audio/ogg; codecs=opus" });
                    chunks.current = [];
                    const audioURL = window.URL.createObjectURL(blob);
                    setRc(audioURL);
                    const file = new File( [ blob ], "speakAnswer.ogg", { type: "audio/ogg"} );
                    setSpeakAnswer(file);
                }
            })
            .catch((err) => {
                console.error(`The following getUserMedia error occurred: ${err}`);
                setMicStatus("notOpen");
            });
        }
        else {
            console.log("getUserMedia not supported on your browser!");
            setMicStatus("notSuport");
        }
    }, [micStatus])

    const startRecord = () => {
        if(!mediaRecorder){
            console.log("cant start recorder");
            return;
        }
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        setRecordState("recording");
    }

    const stopRecord = () => {
        if(!mediaRecorder){
            console.log("cant stop recorder");
            return;
        }
        mediaRecorder.stop();
        console.log("stopRecord");
        console.log(chunks);
        setRecordState(undefined);
    }

    const submitHandler = () => {
        setSubmiting(true);
        dispatch(submitThunk(
            lesson,
            listenResult as any,
            speakAnswer,
            (fresult) => {
                setSubmiting(false);
                setSubmit(true);
                setFResult(fresult);
            }
        ));
    }

    const calcAmountCorrectAnswer = (listeningAnswer: number[], listQuestion: Question[]) => {
        let result = 0;
        listQuestion.forEach((q, idx) => {
          if(listeningAnswer[idx] && listeningAnswer[idx] == listQuestion[idx].correctAnswerId){
            result++;
          }
        });
        
        return result;
    }

    return (
        <PageContainer title={`Learning ${lesson.title}`} description="this is Sample page">
            <DashboardCard title={`Learning ${lesson.title}`}>

                <Stack spacing={2}>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant='h4'>Listening Content</Typography>
                        <HeadphonesIcon />
                    </Stack>

                    <Stack paddingLeft={2} direction="row" spacing={1} alignItems="center">
                    {
                        !listenSrc ?
                        <Typography variant='h6' color="red">Sorry this lesson dont have listen audio</Typography>
                        :
                        <audio controls src={ listenSrc } />
                    }
                    </Stack>

                    <Stack paddingLeft={2} spacing={2}>
                        {
                            lesson.listeningContent.listQuestion.map((quest, index) => {
                                return (
                                    <Stack key={index} padding={2} >
                                        <Stack direction={"row"} spacing={2}>
                                        <Typography variant='h6'>{quest.question}</Typography>
                                        </Stack>
                                        {
                                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group"
                                                onChange={(e) => {
                                                    setListenResult(lr => {
                                                        return lr.map((r, idx) => {
                                                            if(idx == index) return parseInt(e.target.value);
                                                            else return r;
                                                        })
                                                    })
                                                }}>
                                            {
                                                quest.answers.map((an, idx) => {
                                                    return (
                                                        <FormControlLabel key={idx} value={idx + 1} control={<Radio />} label={an}
                                                            checked={listenResult[index] == idx + 1}
                                                        />
                                                    );
                                                })
                                            }
                                            </RadioGroup>
                                        }
                                        {
                                            submit &&
                                            <Stack direction={"row"} spacing={2} alignItems={"center"}  marginTop={2}>
                                            <Typography variant='h6' paddingLeft={2} color={
                                                quest.correctAnswerId == listenResult[index] ? "green" : "red"
                                            }>Answer:</Typography>
                                            {
                                                <Typography variant='h6'>{quest.answers[quest.correctAnswerId - 1]}</Typography>
                                            }
                                            </Stack>
                                        }
                                        {
                                            submit &&
                                            <Stack direction={"row"} spacing={2} marginTop={2}>
                                                <Typography variant='h6' paddingLeft={2} color={"orange"}>Explanation:</Typography>
                                                <Typography variant='h6'>{quest.explanation}</Typography>
                                            </Stack>
                                        }
                                    </Stack>
                                );
                            })
                        }
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant='h4'>Speaking Content</Typography>
                        <SpeakerIcon />
                    </Stack>
                    
                    <Stack paddingLeft={2} direction="row" spacing={1} alignItems="center">
                        {
                            !speakSrc ?
                            <Typography variant='h6' color="red">
                                Sorry this lesson dont have speak example audio
                            </Typography>
                            :
                            <audio controls src={ speakSrc } />
                        }
                    </Stack>
                    <Stack spacing={2} alignItems="flex-start">
                        <Typography variant='h6' align='left'>{lesson.speakingContent.content}</Typography>
                    </Stack>
                    <Stack paddingLeft={2} direction="row" spacing={1} alignItems="center">
                        {
                            micStatus == "notSuport" &&
                            <Typography variant='h6' color="red">
                                Browser dont support micro
                            </Typography>
                        }
                        {
                            micStatus == "notOpen" &&
                            <Typography variant='h6' color="red">
                                Micro is not enable
                            </Typography>
                        }
                        {
                            micStatus == "opening" &&
                            <Typography variant='h6' color="green">
                                Micro is allowed
                            </Typography>
                        }
                        {
                            rc &&
                            <audio controls src={ rc } />
                        }
                        {
                            mediaRecorder && recordState != "recording" &&
                            <Button variant="outlined" onClick={() => {
                                startRecord();
                            }}>
                                Speak
                                <MicIcon />
                            </Button>
                        }
                        {
                            mediaRecorder && recordState == "recording" &&
                            <Button variant="outlined" onClick={() => {
                                stopRecord();
                            }}>
                                Recording...
                                <MicIcon color="error"/>
                            </Button>
                        }
                    </Stack>
                    {
                        submit && !submiting &&
                        <Stack paddingLeft={2} direction="row" spacing={1} alignItems="center">
                            <Typography variant='h6' color="green">
                                {`You said: `}
                            </Typography>
                            <Typography variant='h6' color="purple">
                                {fresult?.context}
                            </Typography>
                        </Stack>
                    }
                    {
                        submit && !submiting &&
                        <Stack paddingLeft={2} direction="row" spacing={1} alignItems="center">
                            <Typography variant='h6' color="green">
                                {`Match: `}
                            </Typography>
                            <div dangerouslySetInnerHTML={{ __html: fresult ? fresult.script : "" }} />
                            
                        </Stack>
                    }

                    <Stack direction={"row"} justifyContent={"space-between"}
                        alignItems={"center"}>
                        {
                            submit &&
                            <Stack direction={"row"} spacing={3} border={1} padding={1} borderColor={"green"}>
                                <Stack>
                                    <Typography>
                                        {`Listening score: ${
                                            ((calcAmountCorrectAnswer(listenResult as any, lesson.listeningContent.listQuestion))
                                            / lesson.listeningContent.listQuestion.length
                                            * 100).toFixed(0)
                                        } %`}
                                    </Typography>    
                                </Stack>
                                <Stack>
                                    <Typography >
                                        {`Speaking score: ${
                                            fresult?.scoreSpeaking
                                        } %`}
                                    </Typography>    
                                </Stack>
                            </Stack>
                        }
                        {
                            !submit && !submiting && recordState != "recording" &&
                            <Button variant="contained" onClick={() => {
                                submitHandler();
                            }}>Submit</Button>
                        }
                        {
                            !submit && submiting && recordState != "recording" &&
                            <CircularProgress />
                        }
                        {
                            submit && recordState != "recording" &&
                            <Button variant="contained" color="error" onClick={() => {
                                setSubmit(false);
                            }}>Again</Button>
                        }
                    </Stack>
                </Stack>
            </DashboardCard>
        </PageContainer>
    );
}