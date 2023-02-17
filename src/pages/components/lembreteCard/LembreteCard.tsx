import React from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box, Button, IconButton } from '@mui/material';
import { addLembrete, removeLembrete } from '../../../feature/lembreteSlice';
import { Actions, Detalhamento, LembreteContainer, Titulo } from './styles';
import { v4 as uuid } from 'uuid';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import Lembrete from '../../../feature/Lembrete';

const LembreteCard: React.FC<{lembrete: Lembrete}> = (props: { lembrete: Lembrete }) => {
	const dispatch = useDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	/* #region CRUD: Delete */
	const action = (key:string, lembrete: Lembrete) => {
		const revert = () => revertRemove(lembrete, key);
		return <Button sx={{ color: 'orange' }} onClick={revert}> Desfazer </Button>;
	};

	function remove(lembrete: Lembrete){
		dispatch(removeLembrete(lembrete.id));
		const key = uuid();

		enqueueSnackbar('Lembrete removido', {
			action: action(key, {...lembrete}),
			key
		});
	}

	function revertRemove(lembrete: Lembrete, snackbarKey: string){
		dispatch(addLembrete(lembrete));
		closeSnackbar(snackbarKey);
	}
	/* #endregion */

	return (
		<LembreteContainer>
			<Box>
				<Titulo> { props.lembrete.descricao } </Titulo>
				<Detalhamento> { props.lembrete.detalhamento} </Detalhamento>
			</Box>
		
			<Actions id="action-area">

				<IconButton onClick={() => { remove(props.lembrete); }}> <DeleteIcon /> </IconButton>
				<IconButton> <ArchiveIcon /> </IconButton>
				<IconButton> <EditIcon /> </IconButton>
			</Actions>
		</LembreteContainer>
	);
};

export default LembreteCard;