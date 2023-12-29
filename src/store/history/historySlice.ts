import { ThunkAction, createSlice } from "@reduxjs/toolkit"
import { Module } from "../module";
import { RootState } from "..";
import axios from "@/api/axios";
import { User } from "../auth";

interface History{
    historyId: number,
    assignmentId: number,
    lessonId: number,
    listeningAnswer: number[],
    scoreListenning: number,
    context: string,
    scoreSpeaking: number,
    script: string,
    createdAt: Date,
    updateAt: Date
}

interface ModuleHistory{
    module: Module,
    histories: History[]
}

interface ModuleVisitHistory{
    moduleVisitHistoryId: number;
    user: User;
    module: Module;
    visitTime: Date;
}

interface HistoryState{
    histories: ModuleHistory[],
    moduleVisitHitories: ModuleVisitHistory[]
}

const init: HistoryState = {
    histories: [],
    moduleVisitHitories: []
}

const historySlice = createSlice({
    name: "history",
    initialState: init,
    reducers: {
        updateState: (state, action: { payload: ModuleHistory[] }) => {
            state.histories = action.payload;
        },
        updateModuleVisitHistories: (state, action: { payload: ModuleVisitHistory[] }) => {
            state.moduleVisitHitories = action.payload;
        }
    }
});

export const history = historySlice.reducer;
export const { updateState, updateModuleVisitHistories } = historySlice.actions;

const getHistoryThunk = (learnerId: string, onSucess: Function) => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const res = await axios.get(
            "/history/getTrainningHistoryByLearnerId?learnerId=" + learnerId
        );
        dispatch(updateState(res.data));
        onSucess();
    }

    return thunk;
}

const saveRecentModule = (moduleId: number) => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
      const res = await axios.post("/mvh/saveRecentModule", {
        learnerId: getState().user.user?.userId,
        moduleId
      });
    }
  
    return thunk;
}

const getRecentModule = () => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
      const res = await axios.get(
        `/mvh/getRecentModule?learnerId=${getState().user.user?.userId}&amount=${99999}`
      );
      dispatch(updateModuleVisitHistories(res.data.data));
    }
  
    return thunk;
}

export { getHistoryThunk, saveRecentModule, getRecentModule }

export type { History }