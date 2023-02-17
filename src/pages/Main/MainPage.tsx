import React from 'react';
import { FormSection, LembretesSection, Main } from './styles';
import { useSelector } from 'react-redux';
import { selectAll } from '../../feature/lembreteSlice';
import Lembrete from '../../feature/Lembrete';
import Form from '../components/form/Form';
import LembreteCard from '../components/lembreteCard/LembreteCard';
import AppBar from '../components/appBar/AppBar';
import Drawer from '../components/drawer/Drawer';  
import { RootState } from '../../feature/store';
import { Box } from '@mui/material';
import { DrawerHeader } from '../components/drawer/styles';

const MainPage: React.FC = () => {
	const lembretes = useSelector(selectAll);
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);

	function getLembretes(){
		return lembretes
			.sort((a: Lembrete, b: Lembrete) => b.criadoEm > a.criadoEm ? 1 : -1)
			.filter(lembrete => !lembrete.excluido);
	}

	function getCard(lembrete: Lembrete){
		return <LembreteCard lembrete={lembrete} key={lembrete.id} />;
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar />

			<Drawer />

			<Main open={open} drawerWidth={width}>
				<DrawerHeader />
				<Box sx={{ maxWidth: '1000px', margin: '0 auto' }}>
					<FormSection>
						<Form />
					</FormSection>

					<LembretesSection>
						{ getLembretes().map(getCard) }
					</LembretesSection>
				</Box>
			</Main>
		</Box>
	);
};

export default MainPage;