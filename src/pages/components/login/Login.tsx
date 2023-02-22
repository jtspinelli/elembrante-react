import React, { useEffect, useRef, useState } from 'react';
import { Actions, Container, Form, transitionDuration } from './styles';
import { Typography, TextField, Button, Box, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoggedUser } from '../../../feature/LoggedUserSlice';
import { defaultUsers } from '../../../helpers/defaultUsers';
import { useSnackbar } from 'notistack';
import { RootState } from '../../../feature/store';
import { selectAll } from '../../../feature/usersSlice';
import { addAll } from '../../../feature/usersSlice';
import User from '../../../feature/User';
import AppIcon from '../AppIcon/AppIcon';
import Logo from '../Logo/Logo';

const Login: React.FC = () => {
	/* #region States, Refs and Hooks */
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const [ username, setUsername ] = useState<string>('');
	const [ senha, setSenha ] = useState<string>('');
	const users = useSelector(selectAll);
	const componentsContainer = useRef<HTMLDivElement>();
	const textFieldUsername = useRef<HTMLElement>();
	const textFieldSenha = useRef<HTMLElement>();
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	/* #endregion */

	/* #region Effects */
	useEffect(redirectIfLoggedIn, [loggedUser]);
	useEffect(setUp, []);

	function setUp(){
		textFieldUsername.current?.focus();
		createDefaultUsersIfNone();
	}

	function redirectIfLoggedIn(){
		if(loggedUser) navigate('/');
	}

	function createDefaultUsersIfNone(){		
		if(!users.length){
			dispatch(addAll(defaultUsers));
		}
	}
	/* #endregion */

	/* #region LoginForm Navigation */
	function next(e: React.FormEvent<HTMLDivElement>){
		e.preventDefault();		
		textFieldUsername.current?.blur();		
		const foundUser = users.find(u => u.username === username);

		if(!foundUser) {
			enqueueSnackbar('Usuário não encontrado');
			return;
		}

		goToPasswordStep();
	}

	function goToPasswordStep(){
		if(!componentsContainer.current) return;

		componentsContainer.current.style.marginLeft = '-450px';
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
	function authenticate(user: User): boolean{
		if(user?.senha !== senha) {
			enqueueSnackbar('Senha incorreta.', {
				variant: 'error'
			});
			return false;
		}
		return true;		
	}

	function login(e: React.FormEvent<HTMLDivElement>){
		e.preventDefault();
		const user = users.find(u => u.username === username);

		if(!user) return;
		if(!authenticate(user)) return;

		dispatch(setLoggedUser({
			id: user.id,
			nome: user.nome,
			username: user.username
		}));
	}
	/* #endregion */

	return (
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
				<Typography variant="h5">Olá, {username}!</Typography>

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
	);
};

export default Login;