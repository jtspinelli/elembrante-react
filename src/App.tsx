import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import theme from "./theme";

const router = createBrowserRouter([{ path: "/", element: <MainPage /> }]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
export default App;
