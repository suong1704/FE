import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { NewModule, createNewModule } from "@/service/modules";
import { Box, Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { handlePostNewModule } from "@/store/module/action";
import { handleAllMyModule } from "@/store/module/action";

interface Props {
  open: boolean;
  handleClose: any;
}

export default function ModalNewModule({ open, handleClose }: Props) {
  const [newModule, setNewModule] = useState<NewModule>({
    title: "",
    description: ""
  });
  const dispatch = useAppDispatch();
  const handleChange = (event: any) => {
    setNewModule({ ...newModule, [event.target.name]: event.target.value });
  };

  const hanldeCreateModule = () => {
    dispatch(handlePostNewModule({ newModule, onSuccess: () => {
      handleClose();
      dispatch(handleAllMyModule());
    } }));
  };

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
      style={modalStyle}>
      <Box sx={paperStyle}>
        <DashboardCard
          title="Create new module"
          action={<IconX onClick={handleClose} color="gray" width={24} />}>
          <Box m={1}>
            <TextField
              fullWidth
              label="Title"
              name="tile"
              sx={{ mb: 2 }}
              onClick={(e) => {
                handleChange(e);
              }}
              onChange={(e) => {
                setNewModule({...newModule, title: e.target.value});
              }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              id="fullWidth"
              onClick={(e) => {
                handleChange(e);
              }}
              onChange={(e) => {
                setNewModule({...newModule, description: e.target.value});
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                startIcon={<IconPlus color="white" />}
                variant="contained"
                onClick={hanldeCreateModule}>
                Create
              </Button>
            </Box>
            {/* <CustomTextField /> */}
          </Box>
        </DashboardCard>
      </Box>
    </Modal>
  );
}
