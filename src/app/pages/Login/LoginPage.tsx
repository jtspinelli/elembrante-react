import React from 'react';
import { Container, Page } from './styles';
import { Route, Routes } from 'react-router-dom';
import Register from '../../../features/users/register/Register';
import Login from '../../../features/users/login/Login';

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