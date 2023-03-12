import React from 'react';
import { LembretesSection } from '../Meus Lembretes/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useTheme } from '@mui/material';
import LembreteCard from '../../../features/lembretes/LembreteCard';
import Typography from '@mui/material/Typography';
import Lembrete from '../../types/Lembrete';

const ArquivoPage: React.FC = () => {
	const theme = useTheme();
	const { lembretes } = useSelector((state: RootState) => state.lembretesReducer);

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
				{ lembretes.filter(lembrete => lembrete.arquivado).map(getCard) }

				{ !lembretes.filter(lembrete => lembrete.arquivado).length && 
					<Typography color={theme.palette.grey[700]}>Nenhum lembrete arquivado.</Typography>
				}
			</LembretesSection>
		</>
	);
};

export default ArquivoPage;