import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import MainPage from './pages/Main/MainPage';
import { Provider } from 'react-redux';
import store from './feature/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);