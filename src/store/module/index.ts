import { ThunkAction, createSelector, createSlice } from "@reduxjs/toolkit";

import { handleAllMyModule, handlePostNewModule } from "./action";
import lesson, { Lesson } from "../lesson";
import { RootState } from "..";
import axios from "@/api/axios";
interface Module {
  moduleId: number,
  title: string;
  description: string;
  creatorId: string,
  username: string,
  createdAt: Date,
  lessons: Lesson[],
  publishTime: Date,
  deleted: boolean,
  published: boolean
}
export interface PayloadNewModule {
  moduleData: Module;
}

export interface InitialState {
  myModules: Module[];
  filter: "all" | "published" | "unPulished" | "deleted";
  allModules: Module[];
  size: number,
  totalPages: number
}
const initialState: InitialState = {
  myModules: [],
  filter: "all",
  allModules: [],
  size: 0,
  totalPages: 0
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    clearDataDetail: (state: any) => {},
    replaceMyModule: (state, action: { payload: Module }) => {
      const newMyModules = state.myModules.map((m) => {
        if(m.moduleId == action.payload.moduleId) return action.payload;
        return m;
      });
      state.myModules = newMyModules;
    },
    updateFilter: (state, action: { payload: InitialState["filter"] }) => {
      state.filter = action.payload;
    },
    addLessonByModuleId: (state, action: { payload: { moduleId: number, lesson: Lesson } }) => {
      const newMyModules = state.myModules.map((m) => {
        if(m.moduleId == action.payload.moduleId){
          m.lessons.push(action.payload.lesson);
        }
        return m;
      });
      state.myModules = newMyModules;
    },
    updateAllModules: (state, action: { payload: { modules: Module[], size: number, totalPages: number } }) => {
      state.allModules = action.payload.modules;
      state.size = action.payload.size;
      state.totalPages = action.payload.totalPages;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(handlePostNewModule.fulfilled, (state, action) => {});
    builder.addCase(handleAllMyModule.fulfilled, (state, action) => {
      state.myModules = action.payload;
    });
  },
});

export const { clearDataDetail, replaceMyModule, updateFilter, addLessonByModuleId,
  updateAllModules } = moduleSlice.actions;

const updateModuleThunk = (module: Module, onSucess: Function) => {
  const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
    const res = await axios.patch(`/modules`, module);
    dispatch(replaceMyModule(module));
    onSucess();
  };

  return thunk;
}

const publishModuleThunk = (module: Module, onSucess: (newModule: Module) => void) => {
  const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
    const res = await axios.put(`/modules/${module.moduleId}/publish`);
    dispatch(replaceMyModule(res.data.data));
    onSucess(res.data.data);
  };

  return thunk;
}

function createLessonThunk(moduleId: number, title: string, onSucess: (newModule: Module) => void){
  const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
      const newLesson = {
        moduleId: moduleId,
        title: title,
        listeningContent: {
          audioUrl: "Your audio",
          listQuestion: [
            {
              question: "Quest 1...",
              answers: ["A. Option A" , "B. Option B", "C. Option C", "D. Option C" ],
              correctAnswerId: 1,
              explanation: "The speaker expresses a preference for..."
            }
          ]
        },
        speakingContent: {
          audioUrl: "https://example.com/listening_part3_q1.mp3",
          content: "value3"
        }
      }

      const res = await axios.post(`/lessons`, newLesson);
      dispatch(addLessonByModuleId({
        moduleId: moduleId,
        lesson: res.data.data
      }));
      onSucess(
        getState().module.myModules.find(m => m.moduleId == moduleId)!
      );
  };
  
  return thunk;
}

const getAllModuleThunk = (offset: number, pageSize: number, publishedTimeOrder?: string) => {
  const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
    const res = await axios.get(`/modules?offset=${offset}&pageSize=${pageSize}
      ${publishedTimeOrder ? `&publishedTimeOrder=${publishedTimeOrder}` : ""}`);
    dispatch(updateAllModules({
      size: res.data.data.size,
      modules: res.data.data.data,
      totalPages: res.data.data.totalPages
    }));
  };

  return thunk;
}

export default moduleSlice.reducer;

export type { Module }

export { updateModuleThunk, publishModuleThunk, createLessonThunk,
  getAllModuleThunk }