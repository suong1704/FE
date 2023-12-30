import { ThunkAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../auth";
import { RootState } from "..";
import axios from "@/api/axios";

export interface ModeratorRequest{
    moderatorRequestId: number,
    requester: User
}

interface ModeratorRequestState{
    requesting?: ModeratorRequest
}

const init: ModeratorRequestState = {}

const moderatorRequestSlice = createSlice({
    name: "moderatorRequest",
    initialState: init,
    reducers: {
        updateRequesting: (state, action: { payload?: ModeratorRequest }) => {
            state.requesting = action.payload;
        }
    }
});

export const moderatorRequestReducer = moderatorRequestSlice.reducer;
export const { updateRequesting } = moderatorRequestSlice.actions;

const getModeratorRequestThunk = () => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const res = await axios.get(
            "/moderatorrequest"
        );
        dispatch(updateRequesting(res.data.data));
    }

    return thunk;
}

const createModeratorRequestThunk = () => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const res = await axios.post(
            "/moderatorrequest"
        );
        console.log(res.data);
        dispatch(updateRequesting(res.data.data));
    }

    return thunk;
}

const cancelModeratorRequestThunk = () => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const requesting = getState().moderatorRequest.requesting;
        if(!requesting){
            console.error("requesting dont exist");
            return;
        }
        const res = await axios.delete(
            `/moderatorrequest/cancel?id=${requesting.moderatorRequestId}`
        );
        dispatch(updateRequesting());
    }

    return thunk;
}

export { getModeratorRequestThunk, createModeratorRequestThunk, cancelModeratorRequestThunk }