/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { ConfirmSenhaTextField, NomeTextField, SenhaTextField, SenhaTextHelperList, UsernameTextField, ValidationListItem } from './styles';
import { hasLetterRegex, hasNumberRegex, hasSpecialCharRegex, senhaRegex, usernameRegex } from '../../../app/helpers/regex';
import { IValidations, validationsInit } from './helpers';
import { Button, ListItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Actions, Form } from '../login/styles';
import { setLoggedUser } from '../LoggedUserSlice';
import { authenticate } from '../../../app/services/AuthenticationService';
import { useSnackbar } from 'notistack';
import { RootState } from '../../../app/store';
import axios from 'axios';
import Logo from '../../../app/components/Logo/Logo';

const Register: React.FC = () => {
	/* #region States, Effects and Hooks */
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
	async function checkValidations(){
		setValidations({
			...validations,
			nomePass: checkNomePass(),
			usernamePass: await checkUsernamePass(),
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
	
	async function checkUsername(){
		setValidations({...validations, usernamePass: await checkUsernamePass()});
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

	async function checkUsernamePass(): Promise<'false' | 'unavailable' | 'true'> {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		const lengthPass = username.length > 2;
		if(!lengthPass) return 'false';
		
		const availablePass = await axios.post(basePath + 'checkuser', { username })
			.then(() => false)
			.catch(() => true);

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

	/* #region Inputs Error Helper Text Getters */
	function getNomeInputHelperText(){
		return !nome.length && validations.nomePass === false 
			? 'Preencha o campo' 
			: validations.nomePass === false 
				? 'Mínimo 3 dígitos.' 
				: '';
	}

	function getUsernameInputHelperText(){
		return !username.length && validations.usernamePass === 'false' 
			? 'Preencha o campo.' 
			: validations.usernamePass === 'unavailable' 
				? 'Nome de usuário não disponível' 
				: validations.usernamePass === 'false' 
					? 'Mínimo 3 dígitos.' 
					: '';
	}

	function getConfirmSenhaInputHelperText(){
		return !confirmSenha.length && validations.confirmSenhaPass === false 
			? 'Preencha o campo.' 
			: validations.confirmSenhaPass === false 
				? 'Campos de senha devem ser iguais.' 
				: '';
	}

	function senhaEmptyAfterTyping(){
		return !senha.length && validations.senha.senhaPass === false;
	}

	function senhaValueIsInvalid(){
		return senha.length > 0 && validations.senha.senhaPass === false;
	}
	/* #endregion */

	function criarConta(e: React.FormEvent<HTMLDivElement>){
		e.preventDefault();
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		if(!validations.nomePass || validations.usernamePass !== 'true' || !validations.senha.senhaPass || !validations.confirmSenhaPass) {
			checkValidations();
			return;
		};

		const newUser = {
			nome,
			username,
			senha
		};

		axios.post(basePath + 'user', newUser)
			.then(async () => {
				enqueueSnackbar('Conta criada com sucesso!', { variant: 'success' });

				const serverResponse = await authenticate(newUser.username, newUser.senha);
				if(!serverResponse) return;
				
				dispatch(setLoggedUser({
					nome: newUser.nome,
					username: newUser.username,
					accessToken: serverResponse.access_token
				}));
			})
			.catch(() => {
				enqueueSnackbar('Erro durante a criação da conta. Tente novamente.', { variant: 'error' });
			});
	}

	return (
		<Form onSubmit={criarConta}>
			<Logo />

			<Typography variant='h4'> Criar conta </Typography>

			<NomeTextField 
				onKeyUp={checkNome}
				error={validations.nomePass === false}
				helperText={getNomeInputHelperText()}
				onChange={(e) => setNome(e.target.value)}
			/>

			<UsernameTextField 
				onKeyUp={checkUsername}
				error={['false', 'unavailable'].includes(validations.usernamePass)}
				helperText={getUsernameInputHelperText()}
				value={username}
				onChange={(e) => {
					const result = (e.target as HTMLInputElement).value.replace(usernameRegex, '').toLowerCase();
					setUsername(result);
				}}
			/>

			<SenhaTextField 
				onKeyUp={checkSenha}
				error={validations.senha.senhaPass === false}
				onChange={(e) => setSenha(e.target.value)}
			/>
			{validations.senha.senhaPass === false && 
				<SenhaTextHelperList>
					{ senhaEmptyAfterTyping() && <ListItem>Preencha o campo.</ListItem> }

					{ senhaValueIsInvalid() &&
						<>
							<ValidationListItem validator={validations.senha.lengthPass ? 1 : 0}> Mínimo 4 dígitos. </ValidationListItem>
							<ValidationListItem validator={validations.senha.hasLetterPass ? 1 : 0}> Ao menos uma letra. </ValidationListItem>
							<ValidationListItem validator={validations.senha.hasNumberPass ? 1 : 0}> Ao menos um número. </ValidationListItem>
							<ValidationListItem validator={validations.senha.hasSpecialCharPass ? 1 : 0}> Ao menos um caractere especial. </ValidationListItem>
						</>
					}					
				</SenhaTextHelperList>
			}

			<ConfirmSenhaTextField
				onKeyUp={checkConfirmSenha}
				error={validations.confirmSenhaPass === false}
				helperText={getConfirmSenhaInputHelperText()}
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