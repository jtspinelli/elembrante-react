import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import MainPage from "./pages/Main/MainPage";
import { Provider } from "react-redux";
import store, { persistor } from "./feature/store";
import { PersistGate } from "redux-persist/integration/react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([{ path: "/", element: <MainPage /> }]);

const meuTema = createTheme({
  palette: {
    primary: {
      main: "#009688",
    },
  },
});

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={meuTema}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
