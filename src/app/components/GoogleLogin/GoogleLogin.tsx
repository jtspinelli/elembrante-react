import React from 'react';
import { CredentialResponse, GoogleLogin as OauthGoogleLogin } from '@react-oauth/google';
import { setLoggedUser } from '../../../features/users/LoggedUserSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios, { AxiosResponse } from 'axios';

const GoogleLogin: React.FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	const googleLogin = (credential: string) => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return new Promise<AxiosResponse>((resolve) => {
			axios.post(basePath + 'googlelogin', {credential})
				.then(data => resolve(data));
		});
	};

	const onError = () => {
		enqueueSnackbar('erro ao comunicar com o servidor', { variant:'error' });
	};

	const onSuccess = async (response: CredentialResponse) => {
		if(!response.credential) return;

		try {
			const authentication = await googleLogin(response.credential);

			if(authentication.data.access_token) {
				dispatch(setLoggedUser({
					nome: authentication.data.userData.nome,
					username: authentication.data.userData.username,
					accessToken: authentication.data.access_token
				}));
				return;
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