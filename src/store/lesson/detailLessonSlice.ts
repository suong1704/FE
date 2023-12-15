import { ThunkAction, createSlice } from "@reduxjs/toolkit";
import { Lesson } from ".";
import { RootState } from "..";
import axios from "@/api/axios";
import { handleAllMyModule } from "../module/action";

interface DetailLessonState{
    lesson?: Lesson
}

const init: DetailLessonState = {
    
}

const detailLessonSlice = createSlice({
    name: "detailLesson",
    initialState: init,
    reducers: {
        updateDetailLesson: (state, action: { payload: Lesson | undefined }) => {
            state.lesson = action.payload;
        }
    }
});

function updateLessonThunk(lesson: Lesson, onSucess: Function){
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const res = await axios.put(`/lessons/${lesson.lessonId}`, lesson);
        dispatch(updateDetailLesson(lesson));
        dispatch(handleAllMyModule());
        onSucess();
    };
    
    return thunk;
}

function deleteLessonThunk(lesson: Lesson, onSucess: Function){
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const res = await axios.delete(`/lessons/${lesson.lessonId}`);
        dispatch(updateDetailLesson());
        dispatch(handleAllMyModule());
        onSucess();
    };
    
    return thunk;
}

export const detailLessonReducer = detailLessonSlice.reducer;
export const { updateDetailLesson } = detailLessonSlice.actions;
export { updateLessonThunk, deleteLessonThunk }