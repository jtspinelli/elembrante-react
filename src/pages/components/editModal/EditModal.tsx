import { Box, Modal } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../feature/store';
import { modalStyle } from './styles';
import { setModalOpen } from '../../../feature/editModalSlice';
import { updateLembrete } from '../../../feature/lembreteSlice';
import { useSnackbar } from 'notistack';
import Edit from './components/Edit';

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
		const lembreteUnchanged = tituloUnchanged &&  detalhamentoUnchanged;

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
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={modalStyle}>
				{ lembrete && <Edit refs={{ titulo, detalhamento }} /> }
			</Box>				
		</Modal>
	);
};

export default EditModal;