import React, { useRef, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Actions, Form } from '../login/styles';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
	const nome = useRef<HTMLInputElement>();
	const [ username, setUsername] = useState<string>('');
	const senha = useRef<HTMLInputElement>();
	const confirmSenha = useRef<HTMLInputElement>();

	function criarConta(e: React.FormEvent<HTMLDivElement>){
		e.preventDefault();

		console.log(nome.current?.value);
		console.log(username);
		console.log(senha.current?.value);
		console.log(confirmSenha.current?.value);
	}

	return (
		<Form onSubmit={criarConta}>
			<Typography variant='h4'> Criar conta </Typography>
			<TextField 
				sx={{ margin: '40px 0 0' }}
				label='Digite seu nome'
				inputRef={nome}
			/>

			<TextField 
				sx={{ margin: '40px 0 0', input: { textTransform: 'lowercase' } }}
				label='Nome de usuário'
				value={username}
				onChange={(e) => {
					const result = (e.target as HTMLInputElement).value.replace(/[^a-z]/gi, '').toLowerCase();
					setUsername(result);
				}}
			/>

			<TextField 
				sx={{ margin: '40px 0 0' }}
				label='Senha'
				inputRef={senha}
				type='password'
			/>

			<TextField 
				sx={{ margin: '40px 0' }}
				label='Repita a senha'
				inputRef={confirmSenha}
				type='password'
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