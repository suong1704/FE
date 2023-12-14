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
import { useAppSelector } from '@/store/hooks';
import { Question } from '@/store/lesson';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const SamplePage = () => {
  const histories = useAppSelector(state => state.history.histories);

  const calcAmountCorrectAnswer = (listeningAnswer: number[], listQuestion: Question[]) => {
    let result = 0;
    listQuestion.forEach((q, idx) => {
      if(listeningAnswer[idx] && listeningAnswer[idx] == listQuestion[idx].correctAnswerId){
        result++;
      }
    });
    
    return result;
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
                histories.map((h) => {
                  return h.histories.map((hh) => {
                    return (
                      <TableRow
                        key={hh.historyId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {h.module.title}
                        </TableCell>
                        <TableCell align="right">{h.module.lessons.find(l => l.lessonId == hh.lessonId)?.title}</TableCell>
                        <TableCell align="right">{`${
                          calcAmountCorrectAnswer(
                            hh.listeningAnswer,
                            (h.module.lessons.find(l => l.lessonId == hh.lessonId)?.listeningContent.listQuestion)!
                          )!} / ${
                            h.module.lessons.find(l => l.lessonId == hh.lessonId)?.listeningContent.listQuestion.length
                          }`}</TableCell>
                        <TableCell align="right">{
                          ((calcAmountCorrectAnswer(
                            hh.listeningAnswer,
                            (h.module.lessons.find(l => l.lessonId == hh.lessonId)?.listeningContent.listQuestion)!
                          )!
                          /
                          (h.module.lessons.find(l => l.lessonId == hh.lessonId)?.listeningContent.listQuestion.length)!) * 100)
                          .toFixed(0)
                        } %</TableCell>
                        <TableCell align="right">{hh.scoreSpeaking.toFixed(0)} %</TableCell>
                        <TableCell align="right">{new Date(hh.updateAt).toLocaleString()}</TableCell>
                      </TableRow>
                    );
                  })
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

