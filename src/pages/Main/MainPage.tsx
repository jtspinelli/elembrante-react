import React from 'react';
import { Box, Button } from '@mui/material';
import { FormContainer } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { addLembrete, selectAll } from '../../feature/lembreteSlice';
import { useSnackbar } from 'notistack';
import { removeLembrete } from '../../feature/lembreteSlice';
import Lembrete from '../../feature/Lembrete';
import Form from '../components/form/Form';
import AppBar from '../components/appBar/AppBar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { v4 as uuid } from 'uuid';


const MainPage: React.FC = () => {
	const lembretes = useSelector(selectAll);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const dispatch = useDispatch();	

	const action = (key:string, lembrete: Lembrete) => (
		<>
		  <Button sx={{ color: 'orange' }} onClick={() => { 
				dispatch(addLembrete(lembrete));
				closeSnackbar(key);
			}}>
			Desfazer
		  </Button>
		</>
	);

	function remove(lembrete: Lembrete){
		dispatch(removeLembrete(lembrete.id));
		const key = uuid();

		enqueueSnackbar('Lembrete removido', {
			action: action(key, {...lembrete}),
			key
		});
	}	

	return (
		<>
			<AppBar />

			<Box sx={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 0' }}>
				<FormContainer>                
					<Form />
				</FormContainer>

				<Box sx={{ display: 'flex', gap: '20px' }}>
					{ lembretes.sort((a: Lembrete, b: Lembrete) => a.criadoEm > b.criadoEm ? 1 : -1).map((lembrete: Lembrete) => (
						<Box sx={{
							border: '1px solid gainsboro',
							borderRadius: '8px',
							width: '250px',	
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',						
							'&:hover': {
								boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)',
								'& #action-area': {
									opacity: 1
								}
							}
						}} key={lembrete.id}> 
							<Box>
								<Box sx={{ cursor: 'default', fontWeight: 500, color: '#2b2b2b', padding: '12px 16px 0' }}> { lembrete.descricao } </Box>
								<Box sx={{ cursor: 'default', padding: '10px 16px 16px' }}> { lembrete.detalhamento} </Box>
							</Box>
							
						
							<Box id="action-area" 
								sx={{ 
									display: 'flex',
									justifyContent: 'end', 
									transition: '.22s', 
									transitionTimingFunction: 
									'ease-in', opacity: '0' 
								}}> 

								<IconButton onClick={() => { remove(lembrete); }}> <DeleteOutlinedIcon /> </IconButton>
								<IconButton> <ArchiveOutlinedIcon /> </IconButton>
								<IconButton> <EditOutlinedIcon /> </IconButton>
							</Box>
						 </Box>
					)) }
				</Box>
			</Box>
		</>        
	);
};

export default MainPage;