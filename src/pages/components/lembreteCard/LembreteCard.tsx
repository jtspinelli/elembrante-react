import React from 'react';
import { Actions, Detalhamento, LembreteContainer, Titulo } from './styles';
import { setModalOpen, setLembrete } from '../../../feature/editModalSlice';
import { Box, IconButton } from '@mui/material';
import { updateLembrete } from '../../../feature/lembreteSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import useSafeRemove from '../../../services/useSafeRemove';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import Lembrete from '../../../feature/Lembrete';

const LembreteCard: React.FC<{lembrete: Lembrete, showEdit: boolean}> = (props: { lembrete: Lembrete, showEdit: boolean }) => {
	const dispatch = useDispatch();
	const { safeRemove, safeArchive } = useSafeRemove();
	const { enqueueSnackbar } = useSnackbar();
	
	function edit(){
		dispatch(setModalOpen(true)); 
		dispatch(setLembrete(props.lembrete));
	}

	function bringBack(){
		dispatch(updateLembrete({
			id: props.lembrete.id,
			changes: {
				excluido: false
			}
		}));

		enqueueSnackbar('Lembrete recuperado!', { variant: 'success', autoHideDuration: 2000 });
	}

	return (
		<LembreteContainer>
			<Box>
				<Titulo> { props.lembrete.descricao } </Titulo>
				<Detalhamento> { props.lembrete.detalhamento} </Detalhamento>
			</Box>
		
			<Actions id="action-area">
				<IconButton onClick={() => { safeRemove(props.lembrete); }}> <DeleteIcon /> </IconButton>
				{ props.showEdit &&
					<>
						<IconButton onClick={() => { safeArchive(props.lembrete); }}> <ArchiveIcon /> </IconButton>
						<IconButton onClick={edit}> <EditIcon /> </IconButton>
					</>					
				}

				{ !props.showEdit &&
					<IconButton onClick={bringBack}> <UnarchiveOutlinedIcon /> </IconButton>
				}
			</Actions>
		</LembreteContainer>
	);
};

export default LembreteCard;