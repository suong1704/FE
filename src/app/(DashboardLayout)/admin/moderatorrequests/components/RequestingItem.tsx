import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { acceptModeratorRequestThunk, cancelModeratorRequestThunk } from "@/store/moderatorRequest/controlModeratorRequestsSlice";
import { ModeratorRequest } from "@/store/moderatorRequest/moderatorRequestSlice";
import { loadImagePromise } from "@/utils/firebaseDownloadUtil";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function RequestingItem({ req }: { req: ModeratorRequest }){
    const storageFireBase = useAppSelector(state => state.storageFireBase);
    const [avSrc, setAvSrc] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        loadImagePromise(storageFireBase, "avatar/" + req.requester.avatarUrl)
        .then((res) => {
            setAvSrc(res.src);
        })
        .catch((err) => {
          console.log(err);
        })
    }, [])

    return (
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Avatar
                src={avSrc ? avSrc : "/images/profile/user-1.jpg"}
                alt="image"
                sx={{
                    width: 35,
                    height: 35,
                }}
            />
            <Typography>{req.requester.fullname}</Typography>
            <div style={{width: "50px"}}></div>
            <Stack direction={"row"} spacing={1}>
                <Button variant="contained"
                    onClick={() => { dispatch(acceptModeratorRequestThunk(req.moderatorRequestId)); }}
                >Accept</Button>
                <Button variant="outlined" color="error"
                    onClick={() => { dispatch(cancelModeratorRequestThunk(req.moderatorRequestId)); }}
                >Cancel</Button>
            </Stack>
        </Stack>
    );
}