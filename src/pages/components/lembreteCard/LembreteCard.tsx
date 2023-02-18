import React from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box, Button, IconButton } from '@mui/material';
import { addLembrete, removeLembrete, updateLembrete } from '../../../feature/lembreteSlice';
import { Actions, Detalhamento, LembreteContainer, Titulo } from './styles';
import { v4 as uuid } from 'uuid';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import Lembrete from '../../../feature/Lembrete';
import { setModalOpen, setLembrete } from '../../../feature/editModalSlice';

const LembreteCard: React.FC<{lembrete: Lembrete}> = (props: { lembrete: Lembrete }) => {
	const dispatch = useDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	/* #region CRUD: Delete/Archive */
	const action = (key:string, lembrete: Lembrete, crudOperation: string) => {
		const revert = () => crudOperation === 'delete' ? revertRemove(lembrete, key) : revertArchive(lembrete, key);
		return <Button sx={{ color: 'orange' }} onClick={revert}> Desfazer </Button>;
	};

	function remove(lembrete: Lembrete){
		dispatch(removeLembrete(lembrete.id));
		const key = uuid();

		enqueueSnackbar('Lembrete removido', {
			action: action(key, {...lembrete}, 'delete'),
			key
		});
	}

	function revertRemove(lembrete: Lembrete, snackbarKey: string){
		dispatch(addLembrete(lembrete));
		closeSnackbar(snackbarKey);
	}	

	function archive(lembrete: Lembrete){
		dispatch(updateLembrete({id: lembrete.id, changes: { excluido: true }}));
		const key = uuid();

		enqueueSnackbar('Lembrete arquivado', {
			action: action(key, lembrete, 'archive'),
			key
		});
	}

	function revertArchive(lembrete: Lembrete, snackbarKey: string){
		dispatch(updateLembrete({id: lembrete.id, changes: { excluido: false }}));
		closeSnackbar(snackbarKey);
	}
	/* #endregion */	

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

				<IconButton onClick={() => { remove(props.lembrete); }}> <DeleteIcon /> </IconButton>
				<IconButton onClick={() => { archive(props.lembrete); }}> <ArchiveIcon /> </IconButton>
				<IconButton onClick={edit}> <EditIcon /> </IconButton>
			</Actions>
		</LembreteContainer>
	);
};

export default LembreteCard;