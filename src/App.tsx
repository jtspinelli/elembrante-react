import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { setLoggedUser } from './features/users/LoggedUserSlice';
import { useDispatch } from 'react-redux';
import LoginPage from './app/pages/Login/LoginPage';
import MainPage from './app/pages/Main/MainPage';
import theme from './theme';
import axios, { AxiosError } from 'axios';

const router = createBrowserRouter([
	{ path: '/*', element: <MainPage />},
	{ path: '/login/*', element: <LoginPage />},
	{ path: '/oauth2callback', element: <LoginPage /> }
]);

const App = () => {
	const dispatch = useDispatch();

	axios.interceptors.response.use((response) => response,	(error: AxiosError) => {
		if(!error.response) return;
		if(error.response.data === 'Token não encontrado ou inválido.') {
			dispatch(setLoggedUser(null));
		}
		return error;
	});

	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider maxSnack={3}>
				<RouterProvider router={router} />
			</SnackbarProvider>
		</ThemeProvider>
	);
};
export default App;
