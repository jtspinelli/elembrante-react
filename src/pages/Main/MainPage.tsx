import { Box, Typography } from "@mui/material";
import { RootState } from "../../feature/store";
import { useSelector } from "react-redux";
import AppBar from "../components/appBar/AppBar";
import DrawerHeader from "../components/sideBar/header";
import SideBar from "../components/sideBar/SideBar";
import Main from "./main";

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
      </Main>
    </Box>
  );
};

export default MainPage;
