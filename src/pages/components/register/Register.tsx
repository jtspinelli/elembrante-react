/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { ConfirmSenhaTextField, NomeTextField, SenhaTextField, SenhaTextHelperList, UsernameTextField, ValidationListItem } from './styles';
import { hasLetterRegex, hasNumberRegex, hasSpecialCharRegex, senhaRegex, usernameRegex } from '../../../helpers/regex';
import { Button, ListItem, Typography } from '@mui/material';
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