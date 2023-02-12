import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { RootState } from "../../feature/store";
import { useDispatch, useSelector } from "react-redux";
import { selectAll } from "../../feature/lembreteSlice";
import { removeLembrete } from "../../feature/lembreteSlice";
import { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import AppBar from "../components/appBar/AppBar";
import DrawerHeader from "../components/sideBar/styles";
import SideBar from "../components/sideBar/SideBar";
import Main from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Lembrete from "../../feature/Lembrete";
import React from "react";

const MainPage: React.FC = () => {
  const { open, width } = useSelector(
    (state: RootState) => state.sideBarReducer
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [selectedToRemove, setSelectedToRemove] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");

  const lembretes: Lembrete[] = useSelector(selectAll);

  const dispatch = useDispatch();

  function confirmRemove(id: string) {
    setSelectedToRemove(id);
    openModal();
  }

  function remove() {
    dispatch(removeLembrete(selectedToRemove));
    setToastMessage("Lembrete excluído com sucesso!");
    closeModal();
  }

  function closeModal() {
    setModalOpen(false);
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeSnackbar() {
    setSnackbarOpen(false);
  }

  function clearToastMessage() {
    setToastMessage("");
  }

  function showToast() {
    if (toastMessage.length === 0) return;
    setSnackbarOpen(true);
    setTimeout(clearToastMessage, 3100);
  }

  useEffect(showToast, [toastMessage]);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar />

      <SideBar />

      <Main open={open} width={width}>
        <Box id="container">
          <DrawerHeader />
          <Typography variant="h3">Meus lembretes</Typography>

          <Box id="cards-container">
            {lembretes.map((lembrete: Lembrete) => (
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {lembrete.descricao}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {lembrete.detalhamento}
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => confirmRemove(lembrete.id)}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="delete">
                    <EditIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      </Main>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmar exclusão
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            O lembrete será permanentemente excluído. Confirmar operação?
          </Typography>

          <Divider sx={{ margin: "20px 0" }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="error" onClick={remove}>
              Confirmar
            </Button>
            <Button color="primary" variant="contained" onClick={closeModal}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MainPage;
