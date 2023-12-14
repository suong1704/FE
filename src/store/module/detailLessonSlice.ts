import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../lesson";

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

export const detailLessonReducer = detailLessonSlice.reducer;
export const { updateDetailLesson } = detailLessonSlice.actions;