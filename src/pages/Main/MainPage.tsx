import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { RootState } from "../../feature/store";
import { useDispatch, useSelector } from "react-redux";
import { selectAll } from "../../feature/lembreteSlice";
import { removeLembrete } from "../../feature/lembreteSlice";
import { useState } from "react";
import AppBar from "../components/appBar/AppBar";
import DrawerHeader from "../components/sideBar/styles";
import SideBar from "../components/sideBar/SideBar";
import Main, { modalStyle } from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Lembrete from "../../feature/Lembrete";
import React from "react";
import { useSnackbar, VariantType } from "notistack";

const MainPage: React.FC = () => {
  const { open, width } = useSelector(
    (state: RootState) => state.sideBarReducer
  );
  const lembretes: Lembrete[] = useSelector(selectAll);
  const { enqueueSnackbar } = useSnackbar();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedToRemove, setSelectedToRemove] = useState<string>("");

  const dispatch = useDispatch();

  function showMessage(message: string, variant: VariantType | undefined) {
    enqueueSnackbar(message, { variant });
  }

  function confirmRemove(id: string) {
    setSelectedToRemove(id);
    openModal();
  }

  function remove() {
    dispatch(removeLembrete(selectedToRemove));
    closeModal();
    showMessage("Lembrete excluído com sucesso!", "success");
  }

  function closeModal() {
    setModalOpen(false);
  }

  function openModal() {
    setModalOpen(true);
  }

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
    </Box>
  );
};

export default MainPage;
