import {
  Box,
  Divider,
  Drawer,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux/es/exports";
import { selectAll } from "../../feature/lembreteSlice";
import Lembrete from "../../feature/Lembrete";
import NewLembreteForm from "../components/newLembrete/NewLembrete";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const MainPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const lembretes = useSelector(selectAll);
  const drawerWidth = 500;
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
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
      </AppBar>

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
          <IconButton onClick={handleDrawerClose}>
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
