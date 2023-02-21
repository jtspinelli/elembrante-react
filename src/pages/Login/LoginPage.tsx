import React from 'react';
import { Container, Page } from './styles';
import { Route, Routes } from 'react-router-dom';
import Register from '../components/register/Register';
import Login from '../components/login/Login';

const LoginPage: React.FC = () => {
	return (
		<Page>
			<Container>
				<Routes>
					<Route path='' element={ <Login /> } />
					<Route path='/cadastro' element={ <Register /> } />
				</Routes>
			</Container>			
		</Page>
	);
};

export default LoginPage;