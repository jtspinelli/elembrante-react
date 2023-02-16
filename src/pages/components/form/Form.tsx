import React, { useEffect, useRef, useState } from 'react';
import { BoxDetalhamento, BoxTitulo, CustomPaper, Placeholder, TextBoxDetalhamento, TextBoxTitulo } from './styles';
import { v4 as uuid } from 'uuid';
import { addLembrete } from '../../../feature/lembreteSlice';
import { useDispatch } from 'react-redux';
import Lembrete from '../../../feature/Lembrete';

const Form: React.FC = () => {
	const [ formExpanded, _setFormExpanded ] = useState<boolean>(false);
	const [ showPlaceholder, setShowPlaceholder ] = useState<{titulo: boolean, detalhamento: boolean}>({titulo: true, detalhamento: true});
	const formIsExpanded = useRef(formExpanded);
	const detalhamentoTextbox = useRef<HTMLDivElement>();
	const tituloTextbox = useRef<HTMLDivElement>();

	const dispatch = useDispatch();

	useEffect(() => document.body.addEventListener('click', collapseFormIfOutsideClick), []);	
	
	const setFormExpanded = (data: boolean) => {		
		_setFormExpanded(data);
		formIsExpanded.current = data;
	};

	const collapseFormIfOutsideClick = (e:MouseEvent) => {
		const clickedOutsideForm = !(e.target as HTMLElement).id.includes('form');

		if(clickedOutsideForm && formIsExpanded.current){
			if(detalhamentoTextbox.current?.innerText.length || tituloTextbox.current?.innerText.length){
				createLembrete();
				return;
			}
			resetForm();
		}
	};

	function createLembrete(){
		const lembrete: Lembrete = {
			id: uuid(),
			criadoEm: new Date(),
			descricao: tituloTextbox.current?.innerText.length ? tituloTextbox.current?.innerText : null,
			detalhamento: detalhamentoTextbox.current?.innerText.length ? detalhamentoTextbox.current?.innerText : null
		};

		dispatch(addLembrete(lembrete));

		resetForm();
	}

	function collapseForm(){
		setFormExpanded(false);
		formIsExpanded.current = false;
	}

	function showPlaceholders(){
		setShowPlaceholder({ titulo: true, detalhamento: true });
	}

	function resetForm(){
		collapseForm();
		showPlaceholders();
		if(detalhamentoTextbox.current) detalhamentoTextbox.current.innerText = '';
		if(tituloTextbox.current) tituloTextbox.current.innerText = '';
	}

	function handlePlaceholder(e: React.FormEvent<HTMLDivElement>){
		const isTextBoxTitulo = (e.target as HTMLElement).id === 'form-titulo';
		const inputValueIsEmpty = !(e.target as HTMLElement).innerText.length;
		isTextBoxTitulo 
			? setShowPlaceholder({...showPlaceholder, titulo: inputValueIsEmpty ?? false})
			: setShowPlaceholder({...showPlaceholder, detalhamento: inputValueIsEmpty ?? false});
	}
    
	return (
		<CustomPaper form-expanded={formExpanded.toString()}>
			<BoxTitulo sx={{ display: formExpanded ? 'block' : 'none' }}>
				<TextBoxTitulo ref={tituloTextbox} onInput={handlePlaceholder}/>

				{ showPlaceholder.titulo && <Placeholder for-titulo="true" form-expanded={formExpanded.toString()}> Título </Placeholder> }
			</BoxTitulo>

			<BoxDetalhamento>
				<TextBoxDetalhamento ref={detalhamentoTextbox} onFocus={() => setFormExpanded(true)} onInput={handlePlaceholder}/>

				{ showPlaceholder.detalhamento && <Placeholder for-titulo="false" form-expanded={formExpanded.toString()}> Criar um lembrete... </Placeholder> }
			</BoxDetalhamento>
		</CustomPaper>
	);
};

export default Form;