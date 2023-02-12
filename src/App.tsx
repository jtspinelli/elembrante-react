import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";

const router = createBrowserRouter([{ path: "/", element: <MainPage /> }]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
