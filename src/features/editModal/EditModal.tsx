import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLembrete } from '../lembretes/lembreteSlice';
import { setModalOpen } from './editModalSlice';
import { useSnackbar } from 'notistack';
import { Box, Modal } from '@mui/material';
import { modalStyle } from './styles';
import { RootState } from '../../app/store';
import Edit from './Edit';

const EditModal: React.FC = () => {
	const { modalOpen, lembrete } = useSelector((state: RootState) => state.editModalReducer);
	const titulo = useRef<HTMLElement>();
	const detalhamento = useRef<HTMLElement>();
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	function updateIfChanged(){
		if(!lembrete) return;

		const editTitulo = titulo.current?.innerText;
		const editDetalhamento = detalhamento.current?.innerText;
		const tituloUnchanged = editTitulo === lembrete?.descricao;
		const detalhamentoUnchanged = editDetalhamento === lembrete?.detalhamento;
		const lembreteUnchanged = tituloUnchanged && detalhamentoUnchanged;

		if(lembreteUnchanged) {
			dispatch(setModalOpen(false));
			return;
		};

		dispatch(updateLembrete({
			id: lembrete.id,
			changes: {
				descricao: titulo.current?.innerText,
				detalhamento: detalhamento.current?.innerText
			}
		}));

		enqueueSnackbar('Lembrete atualizado.', { variant: 'success', autoHideDuration: 2000 });
		
		dispatch(setModalOpen(false));
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