import { IconButton, Toolbar, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../feature/store";
import { setOpen } from "../../../feature/sideBarSlice";
import CustomAppBar from "./custom";

const AppBar: React.FC = () => {
  const { open, width } = useSelector(
    (state: RootState) => state.sideBarReducer
  );

  const dispatch = useDispatch();

  function openSideBar() {
    dispatch(setOpen(true));
  }

  return (
    <CustomAppBar position="fixed" open={open} width={width}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={openSideBar}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          {/* <MenuIcon /> */}
          <AddCircleIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Meus lembretes
        </Typography>
      </Toolbar>
    </CustomAppBar>
  );
};

export default AppBar;
