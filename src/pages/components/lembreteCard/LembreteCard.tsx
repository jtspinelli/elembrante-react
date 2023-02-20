import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import { Actions, Detalhamento, LembreteContainer, Titulo } from './styles';
import { setModalOpen, setLembrete } from '../../../feature/editModalSlice';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import Lembrete from '../../../feature/Lembrete';
import useReverseDelete from '../../../services/useSafeRemove';

const LembreteCard: React.FC<{lembrete: Lembrete}> = (props: { lembrete: Lembrete }) => {
	const dispatch = useDispatch();
	const { safeRemove, safeArchive } = useReverseDelete();
	
	function edit(){
		dispatch(setModalOpen(true)); 
		dispatch(setLembrete(props.lembrete));
	}

	return (
		<LembreteContainer>
			<Box>
				<Titulo> { props.lembrete.descricao } </Titulo>
				<Detalhamento> { props.lembrete.detalhamento} </Detalhamento>
			</Box>
		
			<Actions id="action-area">

				<IconButton onClick={() => { safeRemove(props.lembrete); }}> <DeleteIcon /> </IconButton>
				<IconButton onClick={() => { safeArchive(props.lembrete); }}> <ArchiveIcon /> </IconButton>
				<IconButton onClick={edit}> <EditIcon /> </IconButton>
			</Actions>
		</LembreteContainer>
	);
};

export default LembreteCard;