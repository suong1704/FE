"use client"

import { Button, Stack, Typography } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getModeratorRequestsThunk } from "@/store/moderatorRequest/controlModeratorRequestsSlice";
import RequestingItem from "./components/RequestingItem";
import CachedIcon from '@mui/icons-material/Cached';

export default function ModeratorRequestsPage(){
    const distpatch = useAppDispatch();
    const requestings = useAppSelector(state => state.controlModeratorRequests.requestings);

    useEffect(() => {
        distpatch(getModeratorRequestsThunk());
    }, []);

    return (
        <PageContainer title="Moderator Requests" description="this is Moderator Requests">
          <DashboardCard title="Moderator Requests" action={
            <Button onClick={() => { distpatch(getModeratorRequestsThunk()); }}><CachedIcon /></Button>
          }>
            <Stack marginTop={"-40px"} spacing={4}>
              {
                requestings.map((req) => {
                    return <RequestingItem key={req.moderatorRequestId} req={req}/>
                })
              }
            </Stack>
          </DashboardCard>
        </PageContainer>
    );
}