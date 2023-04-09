import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { CredentialResponse, GoogleLogin as OauthGoogleLogin } from '@react-oauth/google';
import { setLoggedUser } from '../../../features/users/LoggedUserSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import Cookies from 'universal-cookie';

const GoogleLogin: React.FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	const googleLogin = (credential: string) => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return new Promise<AxiosResponse>((resolve) => {
			axios.post(basePath + 'googlelogin', {credential}, {
				withCredentials: true
			})
				.then(data => resolve(data))
				.catch(error => console.log(error));
		});
	};

	const onError = () => {
		enqueueSnackbar('erro ao comunicar com o servidor', { variant:'error' });
	};

	const onSuccess = async (response: CredentialResponse) => {
		if(!response.credential) return;		

		try {
			const authentication = await googleLogin(response.credential);

			if(authentication.status === 200) {
				const cookies = new Cookies();
				cookies.set('token', authentication.data.headerPayload, { path: '/', secure: true });
				
				dispatch(setLoggedUser({
					nome: authentication.data.userData.nome,
					username: authentication.data.userData.username
				}));
			}
		} catch {
			enqueueSnackbar('falha na autenticação', { variant:'error' });
		}
	};

	return (
		<OauthGoogleLogin 
			onSuccess={onSuccess}
			onError={onError}
		/>	
	);
};

export default GoogleLogin;