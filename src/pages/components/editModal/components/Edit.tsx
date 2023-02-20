import React, { useEffect, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../feature/store';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import useSafeRemove from '../../../../services/useSafeRemove';

const Edit: React.FC = () => {
	const { lembrete } = useSelector((state: RootState) => state.editModalReducer);
	const textBoxDetalhamento = useRef<HTMLDivElement>();
	const textBoxTitulo = useRef<HTMLDivElement>();
	const { safeRemove, safeArchive } = useSafeRemove();

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

	function remove(){
		if(!lembrete) return;
		safeRemove(lembrete);
	}

	function archive(){
		if(!lembrete) return;
		safeArchive(lembrete);
	}

	return (
		<>
			<Box 
				ref={textBoxTitulo}
				component='div'
				role='textbox'
				contentEditable='true'
				suppressContentEditableWarning={true}
				sx={{
					padding: '12px 16px 5px 16px',
					fontSize: '20px',
					outline: 'none'
				}}
			>
				{ lembrete && lembrete.descricao }
			</Box>

			<Box
				ref={textBoxDetalhamento} 
				component='div' 
				role='textbox' 
				contentEditable='true' 
				suppressContentEditableWarning={true}
				sx={{padding: '4px 16px 16px 16px', outline: 'none'}} 
			> 
				{ lembrete && lembrete.detalhamento }
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'end', margin: '0 16px 12px' }}>
				<IconButton onClick={remove}> <DeleteIcon /> </IconButton>
				<IconButton onClick={archive}> <ArchiveIcon /> </IconButton>

			</Box>
		</> 
	);
};

export default Edit;