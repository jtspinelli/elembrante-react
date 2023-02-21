/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { hasLetterRegex, hasNumberRegex, hasSpecialCharRegex, senhaRegex } from '../../../helpers/regex';
import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import { Actions, Form } from '../login/styles';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
	const [nome, setNome] = useState<string>('');
	const [ username, setUsername] = useState<string>('');
	const [ senha, setSenha ] = useState<string>('');
	const [ confirmSenha, setConfirmSenha] = useState<string>('');
	const [ nomePass, setNomePass ] = useState<boolean>();
	const [ usernamePass, setUsernamePass ] = useState<boolean>();
	const [ senhaPass, setSenhaPass ] = useState<boolean>();
	const [ senhaLengthPass, setSenhaLengthPass ] = useState<boolean>();
	const [ senhaHasLetterPass, setSenhaHasLetterPass ] = useState<boolean>();
	const [ senhaHasNumberPass, setSenhaHasNumberPass ] = useState<boolean>();
	const [ senhaHasSpecialCharPass, setSenhaHasSpecialCharPass ] = useState<boolean>();
	const [ confirmSenhaPass, setConfirmSenhaPass ] = useState<boolean>();

	function criarConta(e: React.FormEvent<HTMLDivElement>){
		e.preventDefault();

		if(!nomePass || !usernamePass || !senhaPass || !confirmSenhaPass) return;

		alert('create!');
	}

	function checkNome(){
		setNomePass(nome.length > 2);
	}

	function checkUsername(){
		setUsernamePass(username.length > 2);
	}

	function checkSenha(){
		const senhaMatch = senha.match(senhaRegex);
		setSenhaLengthPass(senha.length > 3);
		setSenhaHasLetterPass(senha.match(hasLetterRegex) !== null);
		setSenhaHasNumberPass(senha.match(hasNumberRegex) !== null);
		setSenhaHasSpecialCharPass(senha.match(hasSpecialCharRegex) !== null);
		checkConfirmSenha();
		setSenhaPass(senhaMatch !== null && senhaMatch[0] === senha);
	}

	function checkConfirmSenha(){
		setConfirmSenhaPass(confirmSenha === senha);
	}

	return (
		<Form onSubmit={criarConta}>
			<Typography variant='h4'> Criar conta </Typography>
			<TextField 
				onKeyUp={checkNome}
				error={nomePass === false}
				helperText={!nome.length && nomePass === false ? 'Preencha o campo' : nomePass === false ? 'Mínimo 3 dígitos.' : ''}
				sx={{ margin: '40px 0 0' }}
				label='Digite seu nome'
				onChange={(e) => setNome(e.target.value)}
			/>

			<TextField 
				onKeyUp={checkUsername}
				error={usernamePass === false}
				helperText={!username.length && usernamePass === false ? 'Preencha o campo.' : usernamePass === false ? 'Mínimo 3 dígitos.' : ''}
				sx={{ margin: '40px 0 0', input: { textTransform: 'lowercase' } }}
				label='Nome de usuário'
				value={username}
				onChange={(e) => {
					const result = (e.target as HTMLInputElement).value.replace(/[^a-z]/gi, '').toLowerCase();
					setUsername(result);
				}}
			/>

			<TextField 
				onKeyUp={checkSenha}
				error={senhaPass === false}
				sx={{ margin: '40px 0 0' }}
				label='Senha'
				type='password'
				onChange={(e) => setSenha(e.target.value)}
			/>
			{senhaPass === false && 
				<List sx={{ fontSize: '0.75rem', color: '#f44336', paddingTop: '3px', li: { padding: '0 0 0 14px' } }}>
					{!senha.length && senhaPass === false &&
						<ListItem>Preencha o campo.</ListItem>
					}

					{senha.length > 0 && senhaPass === false &&
						<>
							<ListItem sx={{ color: senhaLengthPass ? 'green' : 'unset' }}> {senhaLengthPass && <span style={{marginRight: '5px'}}>✓</span>} Mínimo 4 dígitos.</ListItem>
							<ListItem sx={{ color: senhaHasLetterPass ? 'green' : 'unset' }}> {senhaHasLetterPass && <span style={{marginRight: '5px'}}>✓</span>} Ao menos uma letra.</ListItem>
							<ListItem sx={{ color: senhaHasNumberPass ? 'green' : 'unset' }}> {senhaHasNumberPass && <span style={{marginRight: '5px'}}>✓</span>}Ao menos um número.</ListItem>
							<ListItem sx={{ color: senhaHasSpecialCharPass ? 'green' : 'unset' }}>{senhaHasSpecialCharPass && <span style={{marginRight: '5px'}}>✓</span>} Ao menos um caractere especial.</ListItem>
						</>
					}					
				</List>
			}

			<TextField
				onKeyUp={checkConfirmSenha}
				error={confirmSenhaPass === false}
				helperText={!confirmSenha.length && confirmSenhaPass === false ? 'Preencha o campo.' : confirmSenhaPass === false ? 'Campos de senha devem ser iguais.' : ''}
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