import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../lesson";

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