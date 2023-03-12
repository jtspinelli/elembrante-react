import React from 'react';
import { CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { FormSection, LembretesSection } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Form from '../../../features/lembretes/LembreteAddForm';
import Lembrete from '../../types/Lembrete';
import LembreteCard from '../../../features/lembretes/LembreteCard';

const MeusLembretesPage: React.FC = () => {
	const { lembretes, loading } = useSelector((state: RootState) => state.lembretesReducer);
	const theme = useTheme();

	function getCard(lembrete: Lembrete){
		return <LembreteCard lembrete={lembrete} key={lembrete.id} showEdit={true} archived={false}/>;
	}

	return <>
		<FormSection>
			<Form />
		</FormSection>

		<LembretesSection>
			{ loading &&
				<Stack sx={{ color: 'grey.500', width: '100%', justifyContent: 'center' }} spacing={2} direction="row">
					<CircularProgress color="primary" />
				</Stack>
			}

			{ lembretes.map(getCard) }

			{!loading && !lembretes.length &&
				<Typography color={theme.palette.grey[700]}>Use o campo acima para criar um novo Lembrete!</Typography>
			}
		</LembretesSection>

	</>;
};

export default MeusLembretesPage;