import { ThunkAction, createSlice } from "@reduxjs/toolkit"
import { Module } from "../module";
import { RootState } from "..";
import axios from "@/api/axios";

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

interface HistoryState{
    histories: ModuleHistory[]
}

const init: HistoryState = {
    histories: []
}

const historySlice = createSlice({
    name: "history",
    initialState: init,
    reducers: {
        updateState: (state, action: { payload: ModuleHistory[] }) => {
            state.histories = action.payload;
        }
    }
});

export const history = historySlice.reducer;
export const { updateState } = historySlice.actions;

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
export { getHistoryThunk }

export type { History }