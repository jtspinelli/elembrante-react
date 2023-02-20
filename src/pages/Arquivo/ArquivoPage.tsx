import React from 'react';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAll } from '../../feature/lembreteSlice';
import Typography from '@mui/material/Typography';
import Lembrete from '../../feature/Lembrete';
import LembreteCard from '../components/lembreteCard/LembreteCard';
import { LembretesSection } from '../Meus Lembretes/styles';

const ArquivoPage: React.FC = () => {
	const theme = useTheme();
	const lembretes = useSelector(selectAll);

	function getLembretes(){
		return lembretes
			.sort((a: Lembrete, b: Lembrete) => b.criadoEm > a.criadoEm ? 1 : -1)
			.filter(lembrete => lembrete.excluido);
	}

	function getCard(lembrete: Lembrete){
		return <LembreteCard lembrete={lembrete} key={lembrete.id} deleteonly={true} />;
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
			</LembretesSection>
		</>
	);
};

export default ArquivoPage;