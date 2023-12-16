'use client';
import { useAppSelector } from "@/store/hooks";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { Button, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useState, useEffect } from "react";
import { loadAudioPromise } from "@/utils/firebaseDownloadUtil";
import SpeakerIcon from '@mui/icons-material/Speaker';

export default function LearnPage(){
    const lesson = useAppSelector(state => state.learn.lesson!);
    const [submit, setSubmit] = useState(false);
    const [listenResult, setListenResult] = useState<(undefined | number)[]>(
        lesson.listeningContent.listQuestion.map(m => undefined)
    );

    const storageFireBase = useAppSelector(state => state.storageFireBase);
    const [listenSrc, setListenSrc] = useState("");
    const [speakSrc, setSpeakSrc] = useState("");

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
                        <Typography variant='h6' color="red">Sorry this lesson dont have audio</Typography>
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
                            <Typography variant='h6' color="red">Dont have speak audio</Typography>
                            :
                            <audio controls src={ speakSrc } />
                        }
                    </Stack>
                    <Stack spacing={2} alignItems="flex-start">
                        <Typography variant='h6' align='left'>{lesson.speakingContent.content}</Typography>
                    </Stack>

                    <Stack direction={"row"} justifyContent={"flex-end"}>
                        {
                            !submit &&
                            <Button variant="contained" onClick={() => {
                                setSubmit(true);
                            }}>Submit</Button>
                        }
                        {
                            submit &&
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