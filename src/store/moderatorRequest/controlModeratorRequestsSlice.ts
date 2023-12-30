import { ThunkAction, createSlice } from "@reduxjs/toolkit";
import { ModeratorRequest } from "./moderatorRequestSlice";
import { RootState } from "..";
import axios from "@/api/axios";

interface ControlModeratorRequestsState{
    requestings: ModeratorRequest[]
}

const init: ControlModeratorRequestsState = {
    requestings: []
}

const controlModeratorRequestsSlice = createSlice({
    name: "controlModeratorRequests",
    initialState: init,
    reducers: {
        updateRequestings: (state, action: { payload: ModeratorRequest[] }) => {
            state.requestings = action.payload;
        }
    }
});

export const controlModeratorRequestsReducer = controlModeratorRequestsSlice.reducer;
export const { updateRequestings } = controlModeratorRequestsSlice.actions;

const getModeratorRequestsThunk = () => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const res = await axios.get(
            "/moderatorrequest/all"
        );
        dispatch(updateRequestings(res.data.data));
    }

    return thunk;
}

const cancelModeratorRequestThunk = (id: number) => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const res = await axios.delete(
            `/moderatorrequest/cancel?id=${id}`
        );
        dispatch(updateRequestings(
            getState().controlModeratorRequests.requestings
            .filter(req => req.moderatorRequestId !== id)
        ));
    }

    return thunk;
}

const acceptModeratorRequestThunk = (id: number) => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const res = await axios.delete(
            `/moderatorrequest/accept?id=${id}`
        );
        dispatch(updateRequestings(
            getState().controlModeratorRequests.requestings
            .filter(req => req.moderatorRequestId !== id)
        ));
    }

    return thunk;
}

export { getModeratorRequestsThunk, cancelModeratorRequestThunk, acceptModeratorRequestThunk }