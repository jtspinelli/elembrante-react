import React, { MutableRefObject, useEffect } from 'react';
import { Actions, TextBoxDetalhamento, TextBoxTitulo } from '../styles';
import { IconButton, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../feature/store';
import useSafeRemove from '../../../../services/useSafeRemove';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Edit: React.FC<{refs: { titulo: MutableRefObject<HTMLElement | undefined>, detalhamento: MutableRefObject<HTMLElement | undefined>}}> = (props: {refs: { titulo: MutableRefObject<HTMLElement | undefined>, detalhamento: MutableRefObject<HTMLElement | undefined>}}) => {
	const { lembrete } = useSelector((state: RootState) => state.editModalReducer);
	const { safeRemove, safeArchive } = useSafeRemove();

	useEffect(positionCaret, []);

	function positionCaret(){
		if(!props.refs.detalhamento.current) return;
		
		const range = document.createRange();
		const sel = window.getSelection();

		range.setStart(props.refs.detalhamento.current.childNodes[0],lembrete?.detalhamento?.length ?? 0);
		range.collapse(true);

		sel?.removeAllRanges();
		sel?.addRange(range);
	}

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
			<TextBoxTitulo ref={props.refs.titulo}>
				{ lembrete && lembrete.descricao }
			</TextBoxTitulo>

			<TextBoxDetalhamento ref={props.refs.detalhamento}> 
				{ lembrete && lembrete.detalhamento }
			</TextBoxDetalhamento>

			<Actions>
				<Tooltip title='excluir'>
					<IconButton onClick={remove}> <DeleteIcon /> </IconButton>
				</Tooltip>

				<Tooltip title='arquivar'>
					<IconButton onClick={archive}> <ArchiveIcon /> </IconButton>
				</Tooltip>
			</Actions>
		</> 
	);
};

export default Edit;