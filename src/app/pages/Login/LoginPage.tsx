import React from 'react';
import { Container, Page } from './styles';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Login from '../../../features/users/login/Login';
import Register from '../../../features/users/register/Register';
import LoadingModal from '../../../features/config/LoadingModal';

const LoginPage: React.FC = () => {
	const { loading } = useSelector((state: RootState) => state.configReducer);

	return (
		<Page>
			<Container>
				<Routes>
					<Route path='' element={ <Login /> } />
					<Route path='/cadastro' element={ <Register /> } />
				</Routes>
			</Container>

			{ loading && 
				<LoadingModal />
			}		
		</Page>
	);
};

export default LoginPage;