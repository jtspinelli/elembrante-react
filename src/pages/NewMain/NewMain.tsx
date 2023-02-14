import { Box, Paper } from '@mui/material';
import React, { useRef, useState } from 'react';
import NewAppBar from '../components/newAppBar/NewAppBar';

const NewMainPage: React.FC = () => {
	const [ detalhamento, setDetalhamento ] = useState<string>('');
	const detalhamentoTextbox = useRef<HTMLDivElement>();

	return (
		<>
			<NewAppBar />

			<Box sx={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 0' }}>

				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>                
					<Paper sx={{
						display: 'flex',
						flexDirection: 'column',
						p: '10px 20px',
						width: 400,
						boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
						border: '1px solid gainsboro',
						borderRadius: '8px' }}
					>
						<Box sx={{ position: 'relative' }}>
							<Box ref={detalhamentoTextbox} component='div' role='textbox' onInput={(e: any) => setDetalhamento(e.target.innerText)} contentEditable='true' sx={{ fontFamily:'Roboto', fontWeight: 400, fontSize: '15px' }} />
							
							{detalhamento.length === 0 && 
								<Box sx={{ fontFamily: 'Roboto', fontWeight: 500, opacity: .71, fontSize: '17px', position: 'absolute', top: 0, pointerEvents: 'none', outline: 'none'}}> Criar um lembrete </Box>							
							}
						</Box>
					</Paper>
				</Box>
			</Box>
		</>        
	);
};

export default NewMainPage;