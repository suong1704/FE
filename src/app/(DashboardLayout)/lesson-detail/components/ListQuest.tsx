import { FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { Lesson, Question } from '@/store/lesson';
import { Dispatch, SetStateAction, memo, useCallback } from 'react';
import Quest from './Quest';

function ListQuest({ questions, mode, setLessonMod }: { questions: Question[], mode: "modify" | "preview", 
    setLessonMod: Dispatch<SetStateAction<Lesson>>
}){
    return (
        <Stack paddingLeft={2} spacing={2}>
            {
                questions.map((quest, index) => {
                    return (
                        <Quest key={index} mode={mode} quest={quest} setLessonMod={setLessonMod} />
                    );
                })
            }
        </Stack>
    );
}

export default memo(ListQuest);