import React, { MutableRefObject, useEffect, useState } from 'react';
import { Actions, Placeholder, TextBoxDetalhamento, TextBoxTitulo } from './styles';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import useSafeRemove from '../../app/services/useSafeRemove';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Edit: React.FC<{refs: { titulo: MutableRefObject<HTMLElement | undefined>, detalhamento: MutableRefObject<HTMLElement | undefined>}}> = (props: {refs: { titulo: MutableRefObject<HTMLElement | undefined>, detalhamento: MutableRefObject<HTMLElement | undefined>}}) => {
	const { lembrete } = useSelector((state: RootState) => state.editModalReducer);
	const [ showTitlePlaceholder, setShowTitlePlaceholder ] = useState<boolean>(false);
	const { safeRemove, safeArchive } = useSafeRemove();

	useEffect(positionCaret, []);
	useEffect(() => {
		setShowTitlePlaceholder(props.refs.titulo.current?.innerText.length === 0);
	}, []);	

	function handlePlaceholder(e: React.FormEvent<HTMLDivElement>){
		const inputValueIsEmpty = !(e.target as HTMLElement).innerText.length;
		setShowTitlePlaceholder(inputValueIsEmpty ?? false);
	}

	function positionCaret(){
		if(!props.refs.detalhamento.current) return;
		
		const range = document.createRange();
		const sel = window.getSelection();

		if(props.refs.detalhamento.current.childNodes.length) {
			range.setStart(props.refs.detalhamento.current.childNodes[0],lembrete?.descricao?.length ?? 0);
		} else {
			range.setStart(props.refs.detalhamento.current, 0);
		}
		
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
			<Box sx={{ position: 'relative' }}>
				<TextBoxTitulo ref={props.refs.titulo} onInput={handlePlaceholder}>
					{ lembrete && lembrete.titulo }
				</TextBoxTitulo>

				{ showTitlePlaceholder && <Placeholder for-titulo="true" form-expanded={'false'}> Título </Placeholder> }
			</Box>

			<TextBoxDetalhamento ref={props.refs.detalhamento}> 
				{ lembrete && lembrete.descricao }
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