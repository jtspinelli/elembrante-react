import React, { MutableRefObject, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../feature/store';
import { Actions, TextBoxDetalhamento, TextBoxTitulo } from '../styles';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import useSafeRemove from '../../../../services/useSafeRemove';

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
				<IconButton onClick={remove}> <DeleteIcon /> </IconButton>
				<IconButton onClick={archive}> <ArchiveIcon /> </IconButton>
			</Actions>
		</> 
	);
};

export default Edit;