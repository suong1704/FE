"use client";
import {
  Button,
  Grid,
  Stack,
  TableFooter,
  TablePagination,
  TableSortLabel,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllModuleThunk } from "@/store/module";
import Link from "next/link";
import ModuleCard from "@/components/ModuleCard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SamplePage = () => {
  const dispatch = useAppDispatch();
  const modules = useAppSelector((state) => state.module.allModules);
  const size = useAppSelector((state) => state.module.size);
  const totalPages = useAppSelector((state) => state.module.totalPages);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userId = useAppSelector((state) => state.auth.dataProfile?.userId);
  const [filter, setFilter] = useState<{ publishAt?: "desc" | "asc" }>({});

  useEffect(() => {
    dispatch(getAllModuleThunk(currentPage, rowsPerPage, filter.publishAt));
  }, [currentPage, rowsPerPage, filter]);

  return (
    <PageContainer title="All " description="this is My Learning">
      <DashboardCard title="All modules">
        <Stack>
          <Grid container spacing={3}>
            {modules.map((m: any) => {
              return <ModuleCard key={m.moduleId} module={m} />;
            })}
          </Grid>
        </Stack>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
