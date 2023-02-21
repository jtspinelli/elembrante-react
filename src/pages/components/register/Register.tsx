/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { hasLetterRegex, hasNumberRegex, hasSpecialCharRegex, senhaRegex } from '../../../helpers/regex';
import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import { IValidations, validationsInit } from './helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Actions, Form } from '../login/styles';
import { setLoggedUser } from '../../../feature/LoggedUserSlice';
import { useSnackbar } from 'notistack';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../../feature/store';
import { selectAll } from '../../../feature/usersSlice';
import { add } from '../../../feature/usersSlice';
import User from '../../../feature/User';

const Register: React.FC = () => {
	/* #region States, Effects and Hooks */
	const users = useSelector(selectAll);
	const [nome, setNome] = useState<string>('');
	const [ username, setUsername] = useState<string>('');
	const [ senha, setSenha ] = useState<string>('');
	const [ confirmSenha, setConfirmSenha] = useState<string>('');
	const [ validations, setValidations ] = useState<IValidations>(validationsInit);	
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	useEffect(redirectIfLoggedIn, [loggedUser]);

	function redirectIfLoggedIn(){
		if(loggedUser) navigate('/');
	}
	/* #endregion */

	/* #region Checkers: Delegators */
	function checkValidations(){
		setValidations({
			...validations,
			nomePass: checkNomePass(),
			usernamePass: checkUsernamePass(),
			senha: {
				lengthPass: checkSenhaLengthPass(),
				hasLetterPass: checkSenhaHasLetterPass(),
				hasNumberPass: checkSenhaHasNumberPass(),
				hasSpecialCharPass: checkSenhaHasSpecialCharPass(),
				senhaPass: checkSenhaPass()
			}
		});
	}

	function checkNome(){
		setValidations({...validations, nomePass: checkNomePass()});
	}
	
	function checkUsername(){
		setValidations({...validations, usernamePass: checkUsernamePass()});
	}

	function checkSenha(){
		setValidations({
			...validations,
			senha: {
				lengthPass: checkSenhaLengthPass(),
				hasLetterPass: checkSenhaHasLetterPass(),
				hasNumberPass: checkSenhaHasNumberPass(),
				hasSpecialCharPass: checkSenhaHasSpecialCharPass(),
				senhaPass: checkSenhaPass()
			},
			...(confirmSenha.length && {
				confirmSenhaPass: checkConfirmSenhaPass()
			})
		});
	}

	function checkConfirmSenha(){
		setValidations({...validations, confirmSenhaPass: checkConfirmSenhaPass()});
	}
	/* #endregion */

	/* #region Checkers: Logics */
	function checkNomePass(){
		return nome.length > 2;
	}	

	function checkUsernamePass(): string{
		const lengthPass = username.length > 2;
		const availablePass = users.find(u => u.username === username) === undefined;

		if(!lengthPass) return 'false';
		if(!availablePass) return 'unavailable';

		return 'true';
	}	

	function checkSenhaLengthPass(){
		return senha.length > 3;
	}

	function checkSenhaHasLetterPass(){
		return senha.match(hasLetterRegex) !== null;
	}

	function checkSenhaHasNumberPass(){
		return senha.match(hasNumberRegex) !== null;
	}

	function checkSenhaHasSpecialCharPass(){
		return senha.match(hasSpecialCharRegex) !== null;
	}

	function checkSenhaPass(){
		const senhaMatch = senha.match(senhaRegex);
		return senhaMatch !== null && senhaMatch[0] === senha;
	}	

	function checkConfirmSenhaPass(){
		return confirmSenha === senha;
	}	
	/* #endregion */

	function criarConta(e: React.FormEvent<HTMLDivElement>){
		e.preventDefault();

		if(!validations.nomePass || validations.usernamePass !== 'true' || !validations.senha.senhaPass || !validations.confirmSenhaPass) {
			checkValidations();
			return;
		};

		const newUser: User = {
			id: uuid(),
			nome,
			username,
			senha
		};

		dispatch(add(newUser));

		enqueueSnackbar('Conta criada com sucesso!', { variant: 'success' });

		dispatch(setLoggedUser({
			id: newUser.id,
			nome: newUser.nome,
			username: newUser.username
		}));
	}

	return (
		<Form onSubmit={criarConta}>
			<Typography variant='h4'> Criar conta </Typography>
			<TextField 
				onKeyUp={checkNome}
				error={validations.nomePass === false}
				helperText={!nome.length && validations.nomePass === false ? 'Preencha o campo' : validations.nomePass === false ? 'Mínimo 3 dígitos.' : ''}
				sx={{ margin: '40px 0 0' }}
				label='Digite seu nome'
				onChange={(e) => setNome(e.target.value)}
			/>

			<TextField 
				onKeyUp={checkUsername}
				error={['false', 'unavailable'].includes(validations.usernamePass)}
				helperText={!username.length && validations.usernamePass === 'false' ? 'Preencha o campo.' : validations.usernamePass === 'unavailable' ? 'Nome de usuário não disponível' : validations.usernamePass === 'false' ? 'Mínimo 3 dígitos.' : ''}
				sx={{ margin: '40px 0 0', input: { textTransform: 'lowercase' } }}
				label='Nome de usuário'
				value={username}
				onChange={(e) => {
					const result = (e.target as HTMLInputElement).value.replace(/[^a-z._]/gi, '').toLowerCase();
					setUsername(result);
				}}
			/>

			<TextField 
				onKeyUp={checkSenha}
				error={validations.senha.senhaPass === false}
				sx={{ margin: '40px 0 0' }}
				label='Senha'
				type='password'
				onChange={(e) => setSenha(e.target.value)}
			/>
			{validations.senha.senhaPass === false && 
				<List sx={{ fontSize: '0.75rem', color: '#f44336', paddingTop: '3px', li: { padding: '0 0 0 14px' } }}>
					{!senha.length && validations.senha.senhaPass === false &&
						<ListItem>Preencha o campo.</ListItem>
					}

					{senha.length > 0 && validations.senha.senhaPass === false &&
						<>
							<ListItem sx={{ color: validations.senha.lengthPass ? 'green' : 'unset' }}> {validations.senha.lengthPass && <span style={{marginRight: '5px'}}>✓</span>} Mínimo 4 dígitos.</ListItem>
							<ListItem sx={{ color: validations.senha.hasLetterPass ? 'green' : 'unset' }}> {validations.senha.hasLetterPass && <span style={{marginRight: '5px'}}>✓</span>} Ao menos uma letra.</ListItem>
							<ListItem sx={{ color: validations.senha.hasNumberPass ? 'green' : 'unset' }}> {validations.senha.hasNumberPass && <span style={{marginRight: '5px'}}>✓</span>}Ao menos um número.</ListItem>
							<ListItem sx={{ color: validations.senha.hasSpecialCharPass ? 'green' : 'unset' }}>{validations.senha.hasSpecialCharPass && <span style={{marginRight: '5px'}}>✓</span>} Ao menos um caractere especial.</ListItem>
						</>
					}					
				</List>
			}

			<TextField
				onKeyUp={checkConfirmSenha}
				error={validations.confirmSenhaPass === false}
				helperText={!confirmSenha.length && validations.confirmSenhaPass === false ? 'Preencha o campo.' : validations.confirmSenhaPass === false ? 'Campos de senha devem ser iguais.' : ''}
				sx={{ margin: '40px 0' }}
				label='Repita a senha'
				type='password'
				onChange={(e) => setConfirmSenha(e.target.value)}
			/>

			<Actions>
				<Link to='/login'>
					<Button sx={{ textTransform: 'none' }}>Voltar para Login</Button>
				</Link>
				<Button type='submit' variant='contained'>Criar conta</Button>
			</Actions>
		</Form>
	);
};

export default Register;