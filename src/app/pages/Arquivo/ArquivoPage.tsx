import React from 'react';
import { LembretesSection } from '../Meus Lembretes/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CircularProgress, Stack, useTheme } from '@mui/material';
import LembreteCard from '../../../features/lembretes/LembreteCard';
import Typography from '@mui/material/Typography';
import Lembrete from '../../types/Lembrete';

const ArquivoPage: React.FC = () => {
	const { lembretes, loading } = useSelector((state: RootState) => state.lembretesReducer);
	const theme = useTheme();

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
				{ loading &&
					<Stack sx={{ color: 'grey.500', width: '100%', justifyContent: 'center' }} spacing={2} direction="row">
						<CircularProgress color="primary" />
					</Stack>
				}

				{ !loading && lembretes.filter(lembrete => lembrete.arquivado).map(getCard) }

				{ !loading && !lembretes.filter(lembrete => lembrete.arquivado).length && 
					<Typography color={theme.palette.grey[700]}>Nenhum lembrete arquivado.</Typography>
				}
			</LembretesSection>
		</>
	);
};

export default ArquivoPage;