import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { RootState } from "../../feature/store";
import { useSelector } from "react-redux";
import { selectAll } from "../../feature/lembreteSlice";
import AppBar from "../components/appBar/AppBar";
import DrawerHeader from "../components/sideBar/styles";
import SideBar from "../components/sideBar/SideBar";
import Main from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Lembrete from "../../feature/Lembrete";

const MainPage: React.FC = () => {
  const { open, width } = useSelector(
    (state: RootState) => state.sideBarReducer
  );

  const lembretes: Lembrete[] = useSelector(selectAll);

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
                  <IconButton aria-label="delete" color="error">
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
    </Box>
  );
};

export default MainPage;
