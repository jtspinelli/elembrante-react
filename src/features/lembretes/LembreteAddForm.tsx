import React, { useEffect, useRef, useState } from 'react';
import store, { RootState } from '../../app/store';
import { BoxDetalhamento, BoxTitulo, CustomPaper, Placeholder, TextBoxDetalhamento, TextBoxTitulo } from './formStyles';
import { createLembrete } from './thunks';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import LembretePhantom from '../../app/types/LembretePhantom';

const Form: React.FC = () => {
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const [ formExpanded, _setFormExpanded ] = useState<boolean>(false);
	const [ showPlaceholder, setShowPlaceholder ] = useState<{titulo: boolean, detalhamento: boolean}>({titulo: true, detalhamento: true});
	const { enqueueSnackbar } = useSnackbar();
	const formIsExpanded = useRef(formExpanded);
	const detalhamentoTextbox = useRef<HTMLDivElement>();
	const tituloTextbox = useRef<HTMLDivElement>();

	useEffect(() => document.body.addEventListener('click', collapseFormIfOutsideClick), []);	
	
	const setFormExpanded = (data: boolean) => {		
		_setFormExpanded(data);
		formIsExpanded.current = data;
	};

	const collapseFormIfOutsideClick = (e:MouseEvent) => {
		const clickedOutsideForm = !(e.target as HTMLElement).id.includes('form');

		if(clickedOutsideForm && formIsExpanded.current){
			if(detalhamentoTextbox.current?.innerText.length || tituloTextbox.current?.innerText.length){
				add();
				return;
			}
			resetForm();
		}
	};

	function add(){
		if(!loggedUser) return;

		if(!tituloTextbox.current || !detalhamentoTextbox.current) return;
		
		const lembrete: LembretePhantom = {
			criadoEm: new Date(),
			titulo: tituloTextbox.current.innerText.length ? tituloTextbox.current.innerText : '',
			descricao: detalhamentoTextbox.current.innerText.length ? detalhamentoTextbox.current.innerText : '',
			arquivado: false
		};

		store.dispatch(createLembrete({ lembrete }))
			.then(() => {
				enqueueSnackbar('Lembrete criado!', { variant: 'success', autoHideDuration: 2000 });

				resetForm();
			});		
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