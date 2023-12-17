import { ThunkAction, createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../lesson";
import { RootState } from "..";
import axios from "@/api/axios";
import baseAxios from "axios";

interface LearnState{
    lesson?: Lesson
}

const init: LearnState = {}

const learnSlice = createSlice({
    name: "learnSlice",
    initialState: init,
    reducers: {
        updateLearnLesson: (state, action: { payload: Lesson }) => {
            state.lesson = action.payload;
        }
    }
});

export const learnReducer = learnSlice.reducer;
export const { updateLearnLesson } = learnSlice.actions;

const submitThunk = (lesson: Lesson, listeningAnswer: number[], speakingFile?: File,
    onSuccess?: (result: { 
        scoreSpeaking: number,
        context: string,
        script: string
}) => void
) =>{
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        
        let assignmentId: number | null = null
        try{
            const res = await axios.post("/assignments", {
                learnerId : getState().auth.dataProfile!.userId,
                moduleId: lesson.moduleId
            });
            console.log(res.data.data);
            assignmentId = res.data.data.assignmentId;
        }
        catch(err){
            console.log("cant get as");
        }

        if(!assignmentId) throw "assignmentId cant find";

        let aiResult: null | any[] = null;
        if(speakingFile){
            const form = new FormData();
            form.set("original_script", lesson.speakingContent.content);
            form.set("audio_file", speakingFile);
            const res = await baseAxios.post("http://127.0.0.1:8001/pronunciation_score", form);
            aiResult = res.data;
            console.log(aiResult);
        }
        else{
            console.log("dont speaking file => speak score is 0");
        }

        const data = {
            assignmentId: assignmentId,
            lessonId: lesson.lessonId,
            listeningAnswer: listeningAnswer,
            scoreSpeaking: aiResult ? aiResult[2] : 0,
            context: aiResult ? aiResult[1] : "",
            script: aiResult ? aiResult[3] : "",
        }
        console.log(data);
        const res = await axios.post("/history", data);
        console.log(res.data.data);

        if(onSuccess) onSuccess({...data});
        console.log("submitThunk");
    }

    return thunk;
}

export { submitThunk }