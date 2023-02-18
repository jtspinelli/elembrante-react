import { Box, Modal } from '@mui/material';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../feature/store';
import { setModalOpen } from '../../../feature/editModalSlice';
import Edit from './components/Edit';

export 	const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: 'none',
	borderRadius: '8px',
	boxShadow: 24,
	p: 0,
};

const EditModal: React.FC = () => {
	const { modalOpen, lembrete } = useSelector((state: RootState) => state.editModalReducer);
	const textBoxDetalhamento = useRef<HTMLDivElement>();
	const dispatch = useDispatch();

	const handleClose = () => dispatch(setModalOpen(false));

	useEffect(() => {
		if(textBoxDetalhamento.current) {
			const range = document.createRange();
			const sel = window.getSelection();

			range.setStart(textBoxDetalhamento.current.childNodes[0],lembrete?.detalhamento?.length ?? 0);
			range.collapse(true);

			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}, []);
	
	return (
		<Modal
			open={modalOpen}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={modalStyle}>
				{ lembrete && <Edit /> }
			</Box>				
		</Modal>
	);
};

export default EditModal;