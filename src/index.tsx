import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
]);

root.render(
    <RouterProvider router={router} />
);