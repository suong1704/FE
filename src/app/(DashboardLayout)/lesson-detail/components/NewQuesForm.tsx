import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Box, Button, FormControlLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Question } from "@/store/lesson";

interface Props {
  open: boolean;
  handleClose: any;
  handleAdd: (quest: Question) => void
}

export default function NewQuesForm({ open, handleClose, handleAdd }: Props) {
  const [quest, setQuest] = useState<Question>({
    question: "",
    answers: ["", "", "", ""],
    correctAnswerId: 1,
    explanation: ""
  });

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  };

  const paperStyle = {
    width: "40%",
    maxHeight: "50%",
    overflowY: "auto",
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={modalStyle}
    >
      <Box sx={paperStyle}>
        <DashboardCard
          title="Add question"
          action={<IconX onClick={handleClose} color="gray" width={24} />}
        >
          <Box m={1}>
            <TextField
              fullWidth
              label="Question"
              name="question"
              sx={{ mb: 2 }}
              onChange={(e) => {
                setQuest({
                    ...quest,
                    question: e.target.value
                })
              }}
            />
            <Stack spacing={1} marginLeft={2} marginBottom={2}>
                <TextField
                fullWidth
                label="A."
                name="a."
                id="fullWidth"
                onChange={(e) => {
                    setQuest(q => {
                        q.answers[0] = e.target.value;
                        return {...q};
                    });
                }}
                />
                <TextField
                fullWidth
                label="B."
                name="b."
                id="fullWidth"
                onChange={(e) => {
                    setQuest(q => {
                        q.answers[1] = e.target.value;
                        return {...q};
                    });
                }}
                />
                <TextField
                fullWidth
                label="C."
                name="c."
                id="fullWidth"
                onChange={(e) => {
                    setQuest(q => {
                        q.answers[2] = e.target.value;
                        return {...q};
                    });
                }}
                />
                <TextField
                fullWidth
                label="D."
                name="d"
                id="fullWidth"
                onChange={(e) => {
                    setQuest(q => {
                        q.answers[3] = e.target.value;
                        return {...q};
                    });
                }}
                />
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group"
                    onChange={(e) => {
                        setQuest({
                            ...quest,
                            correctAnswerId: parseInt(e.target.value)
                        })
                    }
                }>
                    {
                        quest.answers.map((an, index) => {
                            return (
                                <FormControlLabel key={index} value={index + 1} control={<Radio />} label={an}
                                    checked={quest.correctAnswerId == index + 1}
                                />
                            );
                        })
                    }
                </RadioGroup>
            </Stack>
            <TextField
                fullWidth
                label="Explaination"
                name="explaination"
                id="fullWidth"
                onChange={(e) => {
                    setQuest({
                        ...quest,
                        explanation: e.target.value
                    })
                }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                startIcon={<IconPlus color="white" />}
                variant="contained"
                onClick={() => {
                    handleAdd(quest);
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </DashboardCard>
      </Box>
    </Modal>
  );
}
