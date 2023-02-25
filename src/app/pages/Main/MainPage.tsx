import React, { useEffect } from 'react';
import { Main } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { DrawerHeader } from '../../../features/sideBar/styles';
import { Box } from '@mui/material';
import AppBar from '../../components/AppBar/AppBar';
import Drawer from '../../../features/sideBar/SideBar';
import EditModal from '../../../features/editModal/EditModal';
import ArquivoPage from '../Arquivo/ArquivoPage';
import MeusLembretesPage from '../Meus Lembretes/MeusLembretesPage';

const MainPage: React.FC = () => {
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const navigate = useNavigate();

	useEffect(redirectIfLoggedOut, []);

	function redirectIfLoggedOut(){
		if(!loggedUser) navigate('login');
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar />
			<Drawer />

			<Main open={open} drawerwidth={width}>
				<DrawerHeader />

				<Box sx={{ maxWidth: '1000px', margin: '0 auto' }}>
					<Routes>
						<Route path="" element={ <MeusLembretesPage /> } />
						<Route path="/arquivo" element={ <ArquivoPage /> } />
					</Routes>
				</Box>
			</Main>

			<EditModal />
		</Box>
	);
};

export default MainPage;