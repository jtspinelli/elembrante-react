import { styled } from "@mui/material";
import { sideBarWidth } from "../../../feature/sideBarSlice";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const styles = {
  width: sideBarWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: sideBarWidth,
    boxSizing: "border-box",
  },
};

export default DrawerHeader;
