import React, { useRef } from 'react';
import store, { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateLembrete } from '../lembretes/thunks';
import { setModalOpen } from './editModalSlice';
import { useSnackbar } from 'notistack';
import { Box, Modal } from '@mui/material';
import { modalStyle } from './styles';
import Edit from './Edit';

const EditModal: React.FC = () => {
	const { modalOpen, lembrete } = useSelector((state: RootState) => state.editModalReducer);
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const titulo = useRef<HTMLElement>();
	const detalhamento = useRef<HTMLElement>();
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	function updateIfChanged(){
		if(!lembrete || !loggedUser || !titulo.current || !detalhamento.current) return;

		const editTitulo = titulo.current.innerText;
		const editDetalhamento = detalhamento.current.innerText;
		const tituloUnchanged = editTitulo === lembrete?.titulo;
		const detalhamentoUnchanged = editDetalhamento === lembrete?.descricao;
		const lembreteUnchanged = tituloUnchanged && detalhamentoUnchanged;

		if(lembreteUnchanged) {
			dispatch(setModalOpen(false));
			return;
		};

		const obj = {
			id: lembrete.id,
			titulo: editTitulo,
			descricao: editDetalhamento,
			criadoEm: lembrete.criadoEm,
			arquivado: lembrete.arquivado,
			usuarioId: lembrete.usuarioId
		};

		store.dispatch(updateLembrete({ lembrete: obj, accessToken: loggedUser.accessToken }))
			.then(() => {
				enqueueSnackbar('Lembrete atualizado.', { variant: 'success', autoHideDuration: 2000 });		
				dispatch(setModalOpen(false));
			});		
	}
	
	return (
		<Modal
			open={modalOpen}
			onClose={updateIfChanged}
			aria-labelledby="edit-modal"
			aria-describedby="modal for editing Lembrete"
		>
			<Box sx={modalStyle}>
				{ lembrete && <Edit refs={{ titulo, detalhamento }} /> }
			</Box>				
		</Modal>
	);
};

export default EditModal;