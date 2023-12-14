import { Lesson, Question } from '@/store/lesson';
import { FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, memo, useCallback } from 'react';

function Quest({ quest, mode, setLessonMod }: { quest: Question, mode: "modify" | "preview", 
    setLessonMod: Dispatch<SetStateAction<Lesson>>
}){
    
    return (
        <Stack padding={2} >
            <Stack direction={"row"} spacing={2}>
            <Typography variant='h6'>{quest.question}</Typography>
            {
                mode == "modify"
                &&
                <TextField variant='standard' size="small" placeholder='New content...'
                onChange={(e) => {
                    setLessonMod(prev => {
                        const newQuestions = prev.listeningContent.listQuestion.map((q) => {
                            if(q == quest) return {
                                ...q, question: e.target.value
                            };
                            else return q;
                        });

                        return {
                            ...prev,
                            listeningContent:{
                                ...prev.listeningContent,
                                listQuestion: newQuestions
                            }
                        };
                    })
                  }}
                />
            }
            </Stack>
            {
            quest.answers.map((an, index) => {
                return (
                <Stack key={an} direction={"row"} spacing={2} padding={1}>
                    <Typography variant='h6' paddingLeft={2}>{index}.</Typography>
                    <Typography variant='h6'>{an}</Typography>
                    {
                    mode == "modify"
                    &&
                    <TextField variant='standard' size="small" placeholder='New content...'/>
                    }
                </Stack>
                );
            })
            }
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography variant='h6' paddingLeft={2} color={"green"}>Answer:</Typography>
            {
                mode == "preview"
                &&
                <Typography variant='h6'>{quest.answers[quest.correctAnswerId]}</Typography>
            }
            {
                mode == "modify"
                &&
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                >
                {
                    quest.answers.map((an, index) => {
                    return (
                        <FormControlLabel key={index} value={index} control={<Radio />} label={an}
                        checked={quest.correctAnswerId == index}/>
                    );
                    })
                }
                </RadioGroup>
            }
            </Stack>
            <Stack direction={"row"} spacing={2}>
            <Typography variant='h6'>{quest.explanation}</Typography>
            {
                mode == "modify"
                &&
                <TextField variant='standard' size="small" placeholder='New content...'/>
            }
            </Stack>
        </Stack>
    );
}

export default memo(Quest);