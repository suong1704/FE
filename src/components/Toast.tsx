import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { handleToast } from "@/store/toast";

const Toast = () => {
  const settings = useSelector((state: any) => state.Toast.settings);
  const dispatch = useAppDispatch();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={settings.open}
      transitionDuration={500}
      autoHideDuration={5000}
      onClose={() => {
        dispatch(
          handleToast({
            open: false,
          })
        );
      }}>
      <Alert severity={settings.status} sx={{ width: "100%" }}>
        {settings.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
