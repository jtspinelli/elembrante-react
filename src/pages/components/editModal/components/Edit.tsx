import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../feature/store';

const Edit: React.FC = () => {
	const { lembrete } = useSelector((state: RootState) => state.editModalReducer);
	const textBoxDetalhamento = useRef<HTMLDivElement>();
	const textBoxTitulo = useRef<HTMLDivElement>();

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
		</> 
	);
};

export default Edit;