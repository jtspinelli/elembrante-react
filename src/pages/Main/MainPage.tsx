import { Box } from '@mui/material';
import { FormContainer } from './styles';
import React from 'react';
import Form from '../components/form/Form';
import AppBar from '../components/appBar/AppBar';

const MainPage: React.FC = () => {
	return (
		<>
			<AppBar />

			<Box sx={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 0' }}>
				<FormContainer>                
					<Form />
				</FormContainer>
			</Box>
		</>        
	);
};

export default MainPage;