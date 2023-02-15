import React, { useEffect, useRef, useState } from 'react';
import { BoxDetalhamento, BoxTitulo, CustomPaper, Placeholder, TextBoxDetalhamento, TextBoxTitulo } from './styles';

const Form: React.FC = () => {
	const [ expandForm, setExpandForm ] = useState<boolean>(false);
	const [ showPlaceholder, setShowPlaceholder ] = useState<{titulo: boolean, detalhamento: boolean}>({titulo: true, detalhamento: true});
	const detalhamentoTextbox = useRef<HTMLDivElement>();
	const tituloTextbox = useRef<HTMLDivElement>();

	useEffect(() => document.body.addEventListener('click', collapseFormIfOutsideClick), []);

	const collapseFormIfOutsideClick = (e:MouseEvent) => {
		const clickedOutsideForm = !(e.target as HTMLElement).id.includes('form');
		const detalhamentoIsEmpty = !detalhamentoTextbox.current?.innerText.length;
		if(clickedOutsideForm && detalhamentoIsEmpty) resetForm();
	};

	function collapseForm(){
		setExpandForm(false);
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
		<CustomPaper form-expanded={expandForm.toString()}>
			<BoxTitulo sx={{ display: expandForm ? 'block' : 'none' }}>
				<TextBoxTitulo ref={tituloTextbox} onInput={handlePlaceholder}/>

				{ showPlaceholder.titulo && <Placeholder for-titulo="true" form-expanded={expandForm.toString()}> Título </Placeholder> }
			</BoxTitulo>

			<BoxDetalhamento>
				<TextBoxDetalhamento ref={detalhamentoTextbox} onFocus={() => setExpandForm(true)} onInput={handlePlaceholder}/>

				{ showPlaceholder.detalhamento && <Placeholder for-titulo="false" form-expanded={expandForm.toString()}> Criar um lembrete... </Placeholder> }
			</BoxDetalhamento>
		</CustomPaper>
	);
};

export default Form;