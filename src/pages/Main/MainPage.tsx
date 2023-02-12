import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { RootState } from "../../feature/store";
import { useSelector } from "react-redux";
import AppBar from "../components/appBar/AppBar";
import DrawerHeader from "../components/sideBar/styles";
import SideBar from "../components/sideBar/SideBar";
import Main from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MainPage: React.FC = () => {
  const { open, width } = useSelector(
    (state: RootState) => state.sideBarReducer
  );
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar />

      <SideBar />

      <Main open={open} width={width}>
        <DrawerHeader />
        <Typography variant="h3">Meus lembretes</Typography>

        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Primeiro
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fazer tal e tal coisa.
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
      </Main>
    </Box>
  );
};

export default MainPage;
