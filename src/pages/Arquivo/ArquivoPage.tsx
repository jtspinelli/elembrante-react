import React from 'react';
import { LembretesSection } from '../Meus Lembretes/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { selectAll } from '../../feature/lembreteSlice';
import { useTheme } from '@mui/material';
import LembreteCard from '../components/lembreteCard/LembreteCard';
import Typography from '@mui/material/Typography';
import Lembrete from '../../feature/Lembrete';

const ArquivoPage: React.FC = () => {
	const theme = useTheme();
	const lembretes = useSelector(selectAll);
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);

	function getLembretes(){
		if(!loggedUser) return [];

		return lembretes
			.filter(lembrete => lembrete.userId === loggedUser.id && lembrete.excluido)
			.sort((a: Lembrete, b: Lembrete) => b.criadoEm > a.criadoEm ? 1 : -1);
	}

	function getCard(lembrete: Lembrete){
		return <LembreteCard lembrete={lembrete} key={lembrete.id} showEdit={false} archived={true} />;
	}

	return (
		<>
			<Typography		
				variant="h5" 
				color={ theme.palette.grey[900] }
				sx={{ marginBottom: '40px' }}
			>
				Lembretes arquivados
			</Typography>

			<LembretesSection>
				{ getLembretes().map(getCard) }

				{ !getLembretes().length && 
					<Typography color={theme.palette.grey[700]}>Nenhum lembrete arquivado.</Typography>
				}
			</LembretesSection>
		</>
	);
};

export default ArquivoPage;