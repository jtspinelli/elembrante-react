import { styled } from "@mui/material";

const spacing = "20px";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
  width: number;
}>(({ theme, open, width }) => ({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(3),
  "& #container": {
    width: "100%",
    maxWidth: "1100px",

    "& #cards-container": {
      display: "flex",
      flexWrap: "wrap",
      gap: spacing,
      "& .MuiCard-root": {
        width: `calc(33.33% - (${spacing} * 2 / 3))`,
        maxWidth: "100%",
      },
    },
  },
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${width}px`,
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default Main;
