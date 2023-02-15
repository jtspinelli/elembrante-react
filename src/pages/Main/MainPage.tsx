import { Box } from '@mui/material';
import { FormContainer } from './styles';
import React from 'react';
import Form from '../components/form/Form';
import NewAppBar from '../components/appBar/NewAppBar';

const MainPage: React.FC = () => {
	return (
		<>
			<NewAppBar />

			<Box sx={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 0' }}>
				<FormContainer>                
					<Form />
				</FormContainer>
			</Box>
		</>        
	);
};

export default MainPage;