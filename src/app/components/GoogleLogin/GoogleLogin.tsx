import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, selectAll } from '../../../features/users/usersSlice';
import { setLoggedUser } from '../../../features/users/LoggedUserSlice';
import { useSnackbar } from 'notistack';
import { v4 as uuid } from 'uuid';
import OAuth2Login from 'react-simple-oauth2-login';
import axios from 'axios';
import User from '../../types/User';

const GoogleLogin: React.FC = () => {
	const users = useSelector(selectAll);
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	function createUser(user: User){
		dispatch(add(user));
	}

	function logUserIn(user: User){
		dispatch(setLoggedUser({
			id: user.id,
			nome: user.nome,
			username: user.username
		}));
	}

	async function getGoogleUserInfo(token: string){
		const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`;

		await axios.get(url)
			.then((data: { data: { email: string } }) => {
				const foundUser = users.find(u => u.username === data.data.email);

				if(foundUser){
					logUserIn(foundUser);
					return;
				}
				
				const newUser: User = {
					id: uuid(),
					nome: data.data.email.split('@')[0],
					username: data.data.email,
					senha: ''
				};

				createUser(newUser);
				logUserIn(newUser);
			});
	}

	const onFailure = (response: unknown) => {
		const userCanceled = response == 'Error: The popup was closed for an unexpected reason';
		if(userCanceled) return;
		
		enqueueSnackbar('erro ao comunicar com o servidor', { variant:'error' });
	};

	const onSuccess = (response: { access_token: string }) => {
		getGoogleUserInfo(response.access_token);
	};

	return (
		<OAuth2Login
			authorizationUrl='https://accounts.google.com/o/oauth2/auth'
			responseType='token'
			clientId='***REMOVED***'				
			redirectUri='http://localhost:3000/login'
			scope='https://www.googleapis.com/auth/userinfo.email'
			onSuccess={onSuccess}
			onFailure={onFailure}
			buttonText='OAuth2_GoogleLogin'
			className='googleLoginBtn'	
		/>	
	);
};

export default GoogleLogin;