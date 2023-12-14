'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { handleToast } from '@/store/toast';
import { getHistoryThunk } from '@/store/history/historySlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const histories = useAppSelector(state => state.history);
  const auth = useAppSelector(state => state.auth.dataProfile);

  useEffect(() => {
    if(!auth) return;
    dispatch(handleToast({
      open: true,
      status: "success",
      message: "Đang tải lịch sử..."
    }));
    dispatch<any>(getHistoryThunk(auth.userId, () => {
      dispatch(handleToast({
        open: false
      }));
    }));
  }, [])

  console.log(histories);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {
              histories ? <SalesOverview /> : <div></div>
            }
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Dashboard;
