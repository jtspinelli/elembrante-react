import React from 'react';
import { CredentialResponse, GoogleLogin as OauthGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { add, selectAll } from '../../../features/users/usersSlice';
import { setLoggedUser } from '../../../features/users/LoggedUserSlice';
import { useSnackbar } from 'notistack';
import { v4 as uuid } from 'uuid';
import jwt_decode from 'jwt-decode';
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

	const onError = () => {
		enqueueSnackbar('erro ao comunicar com o servidor', { variant:'error' });
	};

	const onSuccess = (response: CredentialResponse) => {
		if(!response.credential) return;

		const userInfo: { email: string, name: string } = jwt_decode(response.credential);

		const foundUser = users.find(u => u.username === userInfo.email);
		if(foundUser){
			logUserIn(foundUser);
			return;
		}
				
		const newUser: User = {
			id: uuid(),
			nome: userInfo.name,
			username: userInfo.email,
			senha: ''
		};

		createUser(newUser);
		logUserIn(newUser);
	};

	return (
		<OauthGoogleLogin 
			onSuccess={onSuccess}
			onError={onError}
		/>	
	);
};

export default GoogleLogin;