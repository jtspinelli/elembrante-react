import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux/es/exports";
import { selectAll } from "../../feature/lembreteSlice";
import Lembrete from "../../feature/Lembrete";
import AppBar from "../components/appBar/AppBar";
import SideBar from "../components/sideBar/SideBar";

const MainPage: React.FC = () => {
  const lembretes = useSelector(selectAll);

  return (
    <>
      <AppBar />

      <SideBar />

      <Box sx={{ paddingTop: "64px" }}>
        <Typography variant="h1">Meus Lembretes</Typography>

        {lembretes.map((lembrete: Lembrete, index) => (
          <p key={index}> {lembrete.descricao} </p>
        ))}
      </Box>
    </>
  );
};

export default MainPage;
