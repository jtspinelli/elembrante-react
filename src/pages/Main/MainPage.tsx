import React from 'react';
import { Main } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { Route, Routes } from 'react-router-dom';
import { DrawerHeader } from '../components/drawer/styles';
import { Box } from '@mui/material';
import AppBar from '../components/appBar/AppBar';
import Drawer from '../components/drawer/Drawer';
import EditModal from '../components/editModal/EditModal';
import ArquivoPage from '../Arquivo/ArquivoPage';
import MeusLembretesPage from '../Meus Lembretes/MeusLembretesPage';

const MainPage: React.FC = () => {
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);

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