import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getListLessonByModuleId = createAsyncThunk(
  "lesson/getListLessonByModuleId",
  async (moduleId: number, { rejectWithValue }) => {
    
  }
);

interface Lesson {

  title: string,
  description: string
}
export interface PayloadLesson {
  LessonData: Lesson;
}

export interface InitialState {

  dataLessonUser: any;
 
}
const initialState: InitialState = {
  dataLessonUser: []
};

const Lesson = createSlice({
  name: "Lesson",
  initialState,
  reducers: {
    clearDataDetail: (state: any) => {
     
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListLessonByModuleId.fulfilled, (state, action) => {
       
      })
  },
});

export const { clearDataDetail } =
  Lesson.actions;

export default Lesson.reducer;
