import { Box, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import NewAppBar from '../components/newAppBar/NewAppBar';

const NewMainPage: React.FC = () => {
	const [ expandForm, setExpandForm ] = useState<boolean>(false);
	const [ showPlaceholder, setShowPlaceholder ] = useState<{titulo: boolean, detalhamento: boolean}>({titulo: true, detalhamento: true});
	const detalhamentoTextbox = useRef<HTMLDivElement>();
	const titleTextbox = useRef<HTMLDivElement>();	

	useEffect(() => {
		const collapseForm = (e:any) => {
			if(!e.target.id.includes('form')){
				setExpandForm(false);
				if(detalhamentoTextbox.current) detalhamentoTextbox.current.innerText = '';
				if(titleTextbox.current) titleTextbox.current.innerText = '';
				setShowPlaceholder({ titulo: true, detalhamento: true });
			}
		};

		document.body.addEventListener('click', collapseForm);

		return () => document.body.removeEventListener('click', collapseForm);
	}, []);

	return (
		<>
			<NewAppBar />

			<Box sx={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 0' }}>

				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', zIndex: 999 }}>                
					<Paper sx={{
						display: 'flex',
						flexDirection: 'column',
						p: '15px 20px',
						width: 400,
						boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
						border: '1px solid gainsboro',
						borderRadius: '8px',				
					}}
					id="form"
					>
						<Box id="form-title-container" sx={{position: 'relative', marginBottom: '25px', display: expandForm ? 'unset' : 'none' }}>
							<Box onInput={(e: any) => {
								setShowPlaceholder({...showPlaceholder, titulo: e.target.innerText.length ? false : true});
							}} ref={titleTextbox} id="form-title" component='div' role='textbox' contentEditable='true' sx={{ fontFamily:'Roboto', fontWeight: 500, fontSize: '17px', outline: 'none' }} />
							
							{showPlaceholder.titulo && 
							<Box sx={{ 
								fontFamily: 'Roboto', 
								fontWeight: 500, 
								opacity: .71, 
								fontSize: '17px',
								position: 'absolute',
								top: 0, 
								pointerEvents: 'none'
							}}
							> 
									Título 
							</Box>
							}
						</Box>

						<Box id="form-detalhamento-container" sx={{ position: 'relative', cursor: 'pointer' }}>
							<Box onInput={(e:any) => {
								setShowPlaceholder({...showPlaceholder, detalhamento: e.target.innerText.length ? false : true});
							}} ref={detalhamentoTextbox} id="form-detalhamento" onFocus={() => setExpandForm(true)} component='div' role='textbox' contentEditable='true' sx={{ fontFamily:'Roboto', fontWeight: 400, fontSize: '15px', outline: 'none' }} />
							
							{showPlaceholder.detalhamento && 
								<Box sx={{ 
									fontFamily: 'Roboto',  
									fontWeight: 500, 
									opacity: .71, 
									fontSize: '17px', 
									position: 'absolute', 
									top: 0, 
									pointerEvents: 'none',									
								}}
								> 
									Criar um lembrete 
								</Box>							
							}
						</Box>
					</Paper>
				</Box>
			</Box>
		</>        
	);
};

export default NewMainPage;