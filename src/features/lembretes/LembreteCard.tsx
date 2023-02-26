import React from 'react';
import { Actions, Detalhamento, LembreteContainer, Titulo } from './styles';
import { setModalOpen, setLembrete } from '../editModal/editModalSlice';
import { Box, IconButton, Tooltip } from '@mui/material';
import { LembreteCardProps } from './interface';
import { updateLembrete } from './lembreteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import useSafeRemove from '../../app/services/useSafeRemove';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { RootState } from '../../app/store';

const LembreteCard: React.FC<LembreteCardProps> = (props: LembreteCardProps) => {
	const dispatch = useDispatch();
	const { safeRemove, safeArchive } = useSafeRemove();
	const { enqueueSnackbar } = useSnackbar();
	const { mainWidth } = useSelector((state: RootState) => state.configReducer);
	
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
		<LembreteContainer archived={props.archived} mainWidth={mainWidth}>
			<Box>
				<Titulo> { props.lembrete.descricao } </Titulo>
				<Detalhamento> { props.lembrete.detalhamento} </Detalhamento>
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