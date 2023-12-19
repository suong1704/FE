import { ThunkAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../auth";
import { RootState } from "..";
import axios from "@/api/axios";

interface UserState{
    user?: User
}

const init: UserState = {};

const userSlice = createSlice({
    name: "userSlice",
    initialState: init,
    reducers: {
        updateUser: (state, action: { payload: User }) => {
            state.user = action.payload;
        }
    }
});

export const userReducer = userSlice.reducer;
export const { updateUser } = userSlice.actions;

const updateUserThunk = (user: User, onConflic: (field: "Email" | "Phone") => void, onSucess: () => void) => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        axios.patch(
            "/user",
            user
        )
        .then((res) => {
            console.log(res.data);
            dispatch(updateUser(res.data.data));
            onSucess();
        })
        .catch((err) => {
            if(err.response.status == 409 && err.response.data.data == "Email"){
                onConflic("Email");
                return;
            }
            if(err.response.status == 409 && err.response.data.data == "Phone"){
                onConflic("Phone");
                return;
            }
        })
    }

    return thunk;
}
export { updateUserThunk }