import React from 'react';
import { Box } from '@mui/material';
import { FormContainer } from './styles';
import { useSelector } from 'react-redux';
import { selectAll } from '../../feature/lembreteSlice';
import Lembrete from '../../feature/Lembrete';
import Form from '../components/form/Form';
import AppBar from '../components/appBar/AppBar';

const MainPage: React.FC = () => {
	const lembretes = useSelector(selectAll);

	return (
		<>
			<AppBar />

			<Box sx={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 0' }}>
				<FormContainer>                
					<Form />
				</FormContainer>
			</Box>

			{ lembretes.map((lembrete: Lembrete) => (
				<p key={lembrete.id}> { lembrete.descricao } </p>
			)) }
		</>        
	);
};

export default MainPage;