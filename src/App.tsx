import React from 'react';
import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import MainPage from './pages/Main/MainPage';
import theme from './theme';
import NewMainPage from './pages/NewMain/NewMain';

// const router = createBrowserRouter([{ path: "/", element: <MainPage /> }]);
const router = createBrowserRouter([{ path: '/', element: <NewMainPage /> }]);

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider maxSnack={3}>
				<RouterProvider router={router} />
			</SnackbarProvider>
		</ThemeProvider>
	);
};
export default App;
