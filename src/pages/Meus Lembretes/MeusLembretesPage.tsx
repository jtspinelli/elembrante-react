import React from 'react';
import { FormSection, LembretesSection } from './styles';
import { Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { selectAll } from '../../feature/lembreteSlice';
import LembreteCard from '../components/lembreteCard/LembreteCard';
import Lembrete from '../../feature/Lembrete';
import Form from '../components/form/Form';

const MeusLembretesPage: React.FC = () => {
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const lembretes = useSelector(selectAll);
	const theme = useTheme();

	function getLembretes(){
		if(!loggedUser) return [];

		return lembretes
			.filter(lembrete => lembrete.userId === loggedUser.id && !lembrete.excluido)
			.sort((a: Lembrete, b: Lembrete) => b.criadoEm > a.criadoEm ? 1 : -1);
	}

	function getCard(lembrete: Lembrete){
		return <LembreteCard lembrete={lembrete} key={lembrete.id} showEdit={true} archived={false}/>;
	}

	return <>
		<FormSection>
			<Form />
		</FormSection>

		<LembretesSection>
			{ getLembretes().map(getCard) }

			{ !getLembretes().length &&
				<Typography color={theme.palette.grey[700]}>Use o campo acima para criar um novo Lembrete!</Typography>
			}
		</LembretesSection>

	</>;
};

export default MeusLembretesPage;