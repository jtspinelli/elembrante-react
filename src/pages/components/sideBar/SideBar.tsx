import { Box, Divider, Drawer, IconButton, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NewLembreteForm from "../newLembrete/NewLembrete";
import { RootState } from "../../../feature/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../../feature/sideBarSlice";
import DrawerHeader, { styles } from "./styles";

const SideBar: React.FC = () => {
  const { open } = useSelector((state: RootState) => state.sideBarReducer);
  const theme = useTheme();
  const dispatch = useDispatch();

  function close() {
    dispatch(setOpen(false));
  }

  return (
    <Drawer sx={styles} variant="persistent" anchor="left" open={open}>
      <DrawerHeader>
        <IconButton onClick={close}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <Box
        sx={{
          padding: "20px",
          position: "absolute",
          top: "50%",
          width: "100%",
          transform: "translateY(-30vh)",
        }}
      >
        <NewLembreteForm />
      </Box>
    </Drawer>
  );
};

export default SideBar;
