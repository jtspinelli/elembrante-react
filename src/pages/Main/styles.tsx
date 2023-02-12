import { styled } from "@mui/material";

const spacing = "20px";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
  width: string;
}>(({ theme, open, width }) => ({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(3),
  "& #container": {
    width: "100%",
    maxWidth: "1100px",

    "&>h3": {
      marginBottom: "20px",
    },

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
  marginLeft: `-${width}`,
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Main;
