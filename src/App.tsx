import React from 'react';
import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import theme from './theme';
import MainPage from './pages/Main/MainPage';

const router = createBrowserRouter([{ path: '/', element: <MainPage /> }]);

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
