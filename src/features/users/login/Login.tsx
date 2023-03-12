import React, { useEffect, useRef, useState } from 'react';
import { Actions, ButtonGoogleLogin, Container, Form, transitionDuration } from './styles';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IAuthResponse } from './IAuthResponse';
import { setLoggedUser } from '../LoggedUserSlice';
import { useSnackbar } from 'notistack';
import { RootState } from '../../../app/store';
import Logo from '../../../app/components/Logo/Logo';
import axios from 'axios';
import GoogleLogin from '../../../app/components/GoogleLogin/GoogleLogin';

const Login: React.FC = () => {
	/* #region States, Refs and Hooks */
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const [ username, setUsername ] = useState<string>('');
	const [ senha, setSenha ] = useState<string>('');
	const componentsContainer = useRef<HTMLDivElement>();
	const textFieldUsername = useRef<HTMLElement>();
	const textFieldSenha = useRef<HTMLElement>();
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	/* #endregion */

	/* #region Effects */
	useEffect(redirectIfLoggedIn, [loggedUser]);
	useEffect(focus, []);

	function focus(){
		textFieldUsername.current?.focus();
	}

	function redirectIfLoggedIn(){
		if(loggedUser) navigate('/');
	}
	/* #endregion */

	/* #region LoginForm Navigation */
	function next(e: React.FormEvent<HTMLDivElement>){
		e.preventDefault();		

		if(!username.length) return enqueueSnackbar('Informe um nome de usuário');

		textFieldUsername.current?.blur();

		axios.post(process.env.REACT_APP_SERVER_BASE_PATH + 'checkuser', { username })
			.then(() =>	goToPasswordStep())
			.catch(() => enqueueSnackbar('Usuário não encontrado'));
	}

	function goToPasswordStep(){
		if(!componentsContainer.current) return;

		componentsContainer.current.style.marginLeft = '-100%';
		setTimeout(() => { textFieldSenha.current?.focus();}, transitionDuration);
	}

	function back(){
		if(!componentsContainer.current) return;

		componentsContainer.current.style.marginLeft = '0';
		setTimeout(() => { textFieldUsername.current?.focus();}, transitionDuration);
		setSenha('');
	}
	/* #endregion */	

	/* #region Authentication/Login */
	async function authenticate(): Promise<IAuthResponse | null>{
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return await axios.post(basePath + 'auth', {username, senha})
			.then((response: {data: IAuthResponse}) => response.data)
			.catch(() => null );
	}

	async function login(e: React.FormEvent<HTMLDivElement>){
		e.preventDefault();

		const serverResponse = await authenticate();
		if(!serverResponse) return enqueueSnackbar('Senha incorreta.');
		
		dispatch(setLoggedUser({
			nome: serverResponse.userData.nome,
			username: serverResponse.userData.username,
			accessToken: serverResponse.access_token
		}));
	}
	/* #endregion */	

	return (
		<>
			<ButtonGoogleLogin>
				<GoogleLogin />
			</ButtonGoogleLogin>
			
			<Container ref={componentsContainer}>
				<Form onSubmit={next}>
					<Logo />

					<Typography variant="h4">Login</Typography>

					<TextField
						inputRef={textFieldUsername}
						inputProps={{tabIndex: -1}}
						label="Usuário" 
						sx={{ margin: '40px 0' }} 
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>

					<Actions>
						<Link to={'/login/cadastro'}>
							<Button>Criar conta</Button>
						</Link>
						<Button type='submit' variant='contained'>Avançar</Button>					
					</Actions>
				</Form>

				<Form onSubmit={login}>
					<Typography variant="h5">Olá, {username.split('@')[0]}!</Typography>

					<TextField 
						inputRef={textFieldSenha}
						label="Digite sua senha" 
						sx={{ margin: '40px 0' }} 
						value={senha}
						type='password'
						onChange={(e) => setSenha(e.target.value)}
					/>

					<Actions>
						<Button onClick={back}>Voltar</Button>				
						<Button type='submit' variant='contained'>Avançar</Button>
					</Actions>
				</Form>
			</Container>
		</>
	);
};

export default Login;