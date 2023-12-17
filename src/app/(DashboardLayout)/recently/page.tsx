'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Lesson, Question } from '@/store/lesson';
import { History, getHistoryThunk } from '@/store/history/historySlice';
import { useEffect } from 'react';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const SamplePage = () => {
  const histories = useAppSelector(state => state.history.histories);
  let listHistory: History[] = [];
  histories.forEach(h => {
    listHistory = listHistory.concat(h.histories)
  });
  listHistory.sort((a, b) => {
    return new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime();
  });

  const auth = useAppSelector(state => state.auth.dataProfile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!auth) return;
    dispatch(getHistoryThunk(
      auth.userId, () => {
    }));
  }, [])

  const calcAmountCorrectAnswer = (listeningAnswer: number[], listQuestion: Question[]) => {
    let result = 0;
    listQuestion.forEach((q, idx) => {
      if(listeningAnswer[idx] && listeningAnswer[idx] == listQuestion[idx].correctAnswerId){
        result++;
      }
    });
    
    return result;
  }

  const findModule = (id: number) => {
    return histories.find(h => h.module.moduleId == id);
  }

  const findLesson = (id: number) => {
    let lessons: Lesson[] = [];
    histories.forEach(h => {
      lessons = lessons.concat(h.module.lessons);
    });
    return lessons.find(l => l.lessonId == id);
  }

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Recently Learn">
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Module</TableCell>
                <TableCell align="right">Lesson</TableCell>
                <TableCell align="right">Listen Sentence</TableCell>
                <TableCell align="right">Listenning Score</TableCell>
                <TableCell align="right">Speaking Score</TableCell>
                <TableCell align="right">Learn on</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                listHistory.map((hh) => {
                  const l = findLesson(hh.lessonId)!;
                  const m = findModule(l.moduleId)!;
                  return (
                    <TableRow
                      key={hh.historyId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {m.module.title}
                      </TableCell>
                      <TableCell align="right">{l.title}</TableCell>
                      <TableCell align="right">{`${
                        calcAmountCorrectAnswer(
                          hh.listeningAnswer,
                          l.listeningContent.listQuestion
                        )!} / ${
                          l.listeningContent.listQuestion.length
                        }`}</TableCell>
                      <TableCell align="right">{
                        ((calcAmountCorrectAnswer(
                          hh.listeningAnswer,
                          l.listeningContent.listQuestion
                        )!
                        /
                        l.listeningContent.listQuestion.length) * 100)
                        .toFixed(0)
                      } %</TableCell>
                      <TableCell align="right">{hh.scoreSpeaking.toFixed(0)} %</TableCell>
                      <TableCell align="right">{new Date(hh.updateAt).toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;