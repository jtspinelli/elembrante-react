import { Box, Divider, Drawer, IconButton, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NewLembreteForm from "../newLembrete/NewLembrete";
import { RootState } from "../../../feature/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../../feature/sideBarSlice";
import DrawerHeader from "./header";

const SideBar: React.FC = () => {
  const { open } = useSelector((state: RootState) => state.sideBarReducer);
  const theme = useTheme();
  const dispatch = useDispatch();

  const drawerWidth = 500;

  function close() {
    dispatch(setOpen(false));
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
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

      <Box sx={{ padding: "20px" }}>
        <NewLembreteForm />
      </Box>
    </Drawer>
  );
};

export default SideBar;
