"use client";
import { Button, Stack, TableFooter, TablePagination, TableSortLabel, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllModuleThunk } from "@/store/module";
import Link from "next/link";

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const SamplePage = () => {
  const dispatch = useAppDispatch();
  const modules = useAppSelector(state => state.module.allModules);
  const size = useAppSelector(state => state.module.size);
  const totalPages = useAppSelector(state => state.module.totalPages);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userId = useAppSelector(state => state.auth.dataProfile?.userId);
  const [filter, setFilter] = useState<{ publishAt?: "desc" | "asc" }>({});

  useEffect(() => {
    dispatch(getAllModuleThunk(currentPage, rowsPerPage, filter.publishAt));
  }, [currentPage, rowsPerPage, filter])

  return (
    <PageContainer title="All " description="this is My Learning">
      <DashboardCard title="All modules">
        <Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">Creator</StyledTableCell>
                  <StyledTableCell align="right">Amount lesson</StyledTableCell>
                  <StyledTableCell align="right">
                    <TableSortLabel active={filter.publishAt !== undefined} direction={filter.publishAt}
                      onClick={() => {
                        setFilter(prev => {
                          return { ...prev, publishAt: (prev.publishAt == "asc" ? "desc" : "asc") }
                        })
                      }}>
                      <span style={{ color: "white" }}>Publish at</span>
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align="right">Created at</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modules.map((m) => (
                  <StyledTableRow key={m.moduleId}>
                    <StyledTableCell component="th" scope="row">
                      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        {m.title}
                        <Link href={`/module-detail/${m.moduleId}?isMyModule=${m.creatorId == userId ? 1 : 0}`}
                          style={{ color: "black", textDecoration: "none" }}>
                          <Button color="success">View</Button>
                        </Link>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell align="right">{m.description}</StyledTableCell>
                    <StyledTableCell align="right">{m.username}</StyledTableCell>
                    <StyledTableCell align="right">{m.lessons.length}</StyledTableCell>
                    <StyledTableCell align="right">
                      {new Date(m.publishTime).toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">{new Date(m.createdAt).toLocaleString()}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    page={currentPage}
                    count={size}
                    rowsPerPageOptions={[5]}
                    rowsPerPage={rowsPerPage}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={(e, page) => {
                      setCurrentPage(page);
                    }}
                    onRowsPerPageChange={(e) => {
                      if(parseInt(e.target.value) > (size - rowsPerPage * currentPage)) return;
                      setRowsPerPage(parseInt(e.target.value));
                    }}
                    //ActionsComponent={() => {}}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Stack>

      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
