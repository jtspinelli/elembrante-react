import React, { useEffect, useRef, useState } from 'react';
import { Actions, ButtonGoogleLogin, Container, Form, transitionDuration } from './styles';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoggedUser } from '../LoggedUserSlice';
import { authenticate } from '../../../app/services/AuthenticationService';
import { useSnackbar } from 'notistack';
import { setLoading } from '../../config/configSlice';
import { RootState } from '../../../app/store';
import GoogleLogin from '../../../app/components/GoogleLogin/GoogleLogin';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Logo from '../../../app/components/Logo/Logo';
import Cookies from 'universal-cookie';

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
	useEffect(() => {dispatch(setLoading(false));}, [loggedUser]);

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

		dispatch(setLoading(true));

		if(!username.length) return enqueueSnackbar('Informe um nome de usuário');

		textFieldUsername.current?.blur();

		axios.post(process.env.REACT_APP_SERVER_BASE_PATH + 'checkuser', { username })
			.then((response: AxiosResponse | AxiosError) =>	{
				if(response instanceof AxiosError && response.response?.status === 404) {
					dispatch(setLoading(false));
					return enqueueSnackbar('Usuário não encontrado');
				}
				dispatch(setLoading(false));
				goToPasswordStep();
			});
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
	async function login(e: React.FormEvent<HTMLDivElement>){
		e.preventDefault();

		dispatch(setLoading(true));

		const serverResponse = await authenticate(username, senha);
		if(!serverResponse) {
			dispatch(setLoading(false));
			enqueueSnackbar('Senha incorreta.');
			return;
		};

		const cookies = new Cookies();
		cookies.set('token', serverResponse.headerPayload, { path: '/', secure: true });
		
		dispatch(setLoggedUser({
			nome: serverResponse.userData.nome,
			username: serverResponse.userData.username
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