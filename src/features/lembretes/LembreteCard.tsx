import React from 'react';
import { Actions, Detalhamento, LembreteContainer, Titulo } from './styles';
import { setModalOpen, setLembrete } from '../editModal/editModalSlice';
import { Box, IconButton, Tooltip } from '@mui/material';
import { LembreteCardProps } from './interface';
// import { updateLembrete } from './lembreteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import useSafeRemove from '../../app/services/useSafeRemove';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import store, { RootState } from '../../app/store';
import { recoverOne } from './lembreteSlice';
import { recoverLembrete } from './thunks';

const LembreteCard: React.FC<LembreteCardProps> = (props: LembreteCardProps) => {
	const dispatch = useDispatch();
	const { safeRemove, safeArchive } = useSafeRemove();
	const { enqueueSnackbar } = useSnackbar();
	const { mainWidth } = useSelector((state: RootState) => state.configReducer);
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	
	function edit(){
		dispatch(setModalOpen(true)); 
		dispatch(setLembrete(props.lembrete));
	}

	function bringBack(){
		if(!loggedUser) return;
		
		dispatch(recoverOne(props.lembrete.id));

		store.dispatch(recoverLembrete({ id: props.lembrete.id, accessToken: loggedUser.accessToken }));

		enqueueSnackbar('Lembrete recuperado!', { variant: 'success', autoHideDuration: 2000 });
	}

	function getTitulo(){
		if(!props.lembrete.titulo) return;
		
		if(props.lembrete.titulo.length < 30) return props.lembrete.titulo;
		return props.lembrete.titulo.substring(0, 30) + '...';
	}

	function getDetalhamento(){
		if(!props.lembrete.descricao) return;

		if(props.lembrete.descricao.length < 60) return props.lembrete.descricao;
		return props.lembrete.descricao.substring(0, 60) + '...';
	}

	return (
		<LembreteContainer archived={props.archived} mainWidth={mainWidth}>
			<Box>
				<Titulo> { getTitulo() } </Titulo>
				<Detalhamento> { getDetalhamento() } </Detalhamento>
			</Box>
		
			<Actions id="action-area">
				<Tooltip title="excluir">
					<IconButton onClick={() => { safeRemove(props.lembrete); }}> <DeleteIcon /> </IconButton>
				</Tooltip>
				{ props.showEdit &&
					<>
						<Tooltip title="arquivar">
							<IconButton onClick={() => { safeArchive(props.lembrete); }}> <ArchiveIcon /> </IconButton>
						</Tooltip>

						<Tooltip title="editar">
							<IconButton onClick={edit}> <EditIcon /> </IconButton>
						</Tooltip>
					</>					
				}

				{ !props.showEdit &&
					<Tooltip title="recuperar">
						<IconButton onClick={bringBack}> <UnarchiveOutlinedIcon /> </IconButton>
					</Tooltip>
				}
			</Actions>
		</LembreteContainer>
	);
};

export default LembreteCard;