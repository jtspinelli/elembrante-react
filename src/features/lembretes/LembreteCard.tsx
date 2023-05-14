import React from 'react';
import store, { RootState } from '../../app/store';
import { Actions, Detalhamento, LembreteContainer, Titulo } from './styles';
import { setModalOpen, setLembrete } from '../editModal/editModalSlice';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LembreteCardProps } from './interface';
import { recoverLembrete } from './thunks';
import { useSnackbar } from 'notistack';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import useSafeRemove from '../../app/services/useSafeRemove';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';

const LembreteCard: React.FC<LembreteCardProps> = (props: LembreteCardProps) => {
	const dispatch = useDispatch();
	const { safeRemove, safeArchive } = useSafeRemove();
	const { enqueueSnackbar } = useSnackbar();
	const { updating, recovering } = useSelector((state: RootState) => state.lembretesReducer);
	const { mainWidth } = useSelector((state: RootState) => state.configReducer);
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	
	function edit(){
		dispatch(setModalOpen(true)); 
		dispatch(setLembrete(props.lembrete));
	}

	function bringBack(){
		if(!loggedUser) return;

		store.dispatch(recoverLembrete({ id: props.lembrete.id }))
			.then((response) => {
				if(!response.payload) return;
				enqueueSnackbar('Lembrete recuperado!', { variant: 'success', autoHideDuration: 2000 });
			});		
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
					<span>
						<IconButton disabled={!props.lembrete.id || updating || recovering} onClick={() => { safeRemove(props.lembrete); }}> <DeleteIcon /> </IconButton>
					</span>
				</Tooltip>
				{ props.showEdit &&
					<>
						<Tooltip title="arquivar">
							<span>
								<IconButton disabled={!props.lembrete.id || updating || recovering} onClick={() => { safeArchive(props.lembrete); }}> <ArchiveIcon /> </IconButton>
							</span>
						</Tooltip>

						<Tooltip title="editar">
							<span>
								<IconButton disabled={!props.lembrete.id || updating || recovering} onClick={edit}> <EditIcon /> </IconButton>
							</span>
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