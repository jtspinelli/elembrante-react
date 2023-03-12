import React, { useEffect } from 'react';
import store, { RootState } from '../../store';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, useTheme } from '@mui/material';
import { DrawerHeader } from '../../../features/sideBar/styles';
import { getLembretes } from '../../../features/lembretes/thunks';
import { useMeasure } from 'react-use';
import { setWidth } from '../../../features/config/configSlice';
import { Main } from './styles';
import Drawer from '../../../features/sideBar/SideBar';
import AppBar from '../../components/AppBar/AppBar';
import EditModal from '../../../features/editModal/EditModal';
import ArquivoPage from '../Arquivo/ArquivoPage';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import MeusLembretesPage from '../Meus Lembretes/MeusLembretesPage';

const MainPage: React.FC = () => {
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const [ ref, { width: mainWidth } ] = useMeasure();
	const theme = useTheme();
	const upSm = useMediaQuery(theme.breakpoints.up('sm'));
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(redirectIfLoggedOut, []);
	useEffect(() => { dispatch(setWidth(mainWidth)); }, [mainWidth]);

	useEffect(() => {
		if(!loggedUser) return;
		store.dispatch(getLembretes(loggedUser.accessToken));
	}, []);

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