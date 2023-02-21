import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@mui/material';
import LoginPage from './pages/Login/LoginPage';
import MainPage from './pages/Main/MainPage';
import theme from './theme';

const router = createBrowserRouter([
	{ path: '/*', element: <MainPage />},
	{ path: '/login/*', element: <LoginPage />}
]);

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
