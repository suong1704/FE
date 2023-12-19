import { ThunkAction } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import { RootState } from "..";

const firebaseConfig = {
    apiKey: "AIzaSyDz4KV8WHtBWYHg-rz_pBb0pRF6k9_d7gQ",
    authDomain: "webchat-364223.firebaseapp.com",
    projectId: "webchat-364223",
    storageBucket: "webchat-364223.appspot.com",
    messagingSenderId: "493170822018",
    appId: "1:493170822018:web:6582fd85fb0fe076b2dd9b",
    measurementId: "G-FSZCHZ9J9F"
};
const appFireBase = initializeApp(firebaseConfig);
const storageFireBase = getStorage(appFireBase);

const initialState = storageFireBase;
function storageFireBaseReducer(state = initialState, action: any){
    return state;
}

export default storageFireBaseReducer;
export { storageFireBase }

const uploadAudioThunk = (oldUrl: string, lessonId: number, types: "listen" | "speak", file: File,
onSuccess: (url: string) => void) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const fileName = `${lessonId}-${types}-${file.name}`;
        const storageFireBase = getState().storageFireBase;
        const storageRef = ref(storageFireBase, `lesson/${fileName}`);

        const deleteRef = ref(storageFireBase, `lesson/${oldUrl}`);
        deleteObject(deleteRef).then(() => {
            console.log("delete: " + oldUrl);
        }).catch((error) => {
            console.log(error);
        });
        
        uploadBytes(storageRef, file)
        .then(res => {
            console.log("success upload file to fire base");
            onSuccess(fileName);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return thunk;
}

const uploadAvatarThunk = (oldUrl: string, userId: string, file: File,
onSuccess: (url: string) => void) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const fileName = `${userId}-${file.name}`;
        const storageFireBase = getState().storageFireBase;
        const storageRef = ref(storageFireBase, `avatar/${fileName}`);

        const deleteRef = ref(storageFireBase, `avatar/${oldUrl}`);
        deleteObject(deleteRef).then(() => {
            console.log("delete: " + oldUrl);
        }).catch((error) => {
            console.log(error);
        });
        
        uploadBytes(storageRef, file)
        .then(res => {
            console.log("success upload file to fire base");
            onSuccess(fileName);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return thunk;
}

export { uploadAudioThunk, uploadAvatarThunk }