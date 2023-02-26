import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { DrawerHeader } from '../../../features/sideBar/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Main } from './styles';
import { Box, useTheme } from '@mui/material';
import Drawer from '../../../features/sideBar/SideBar';
import AppBar from '../../components/AppBar/AppBar';
import EditModal from '../../../features/editModal/EditModal';
import ArquivoPage from '../Arquivo/ArquivoPage';
import MeusLembretesPage from '../Meus Lembretes/MeusLembretesPage';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import { useMeasure } from 'react-use';
import { setWidth } from '../../../features/config/configSlice';

const MainPage: React.FC = () => {
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const upSm = useMediaQuery(theme.breakpoints.up('sm'));
	const [ ref, { width: mainWidth } ] = useMeasure();

	useEffect(redirectIfLoggedOut, []);
	useEffect(() => { dispatch(setWidth(mainWidth)); }, [mainWidth]);

	function redirectIfLoggedOut(){
		if(!loggedUser) navigate('login');
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar />
			<Drawer />

			<Main open={open} drawerwidth={width} upSm={upSm}>
				<DrawerHeader />

				<Box ref={ref} sx={{ maxWidth: '1000px', margin: '0 auto' }}>
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