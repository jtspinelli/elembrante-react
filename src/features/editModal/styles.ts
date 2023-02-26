import { Box, styled } from '@mui/material';

export const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	maxWidth: '90vw',
	bgcolor: 'background.paper',
	border: 'none',
	borderRadius: '8px',
	boxShadow: 24,
	p: 0,
};

export const TextBoxTitulo = styled(Box)({
	padding: '12px 16px 5px 16px',
	fontSize: '20px',
	outline: 'none'
});
TextBoxTitulo.defaultProps = {
	component: 'div',
	role: 'textbox',
	contentEditable: 'true',
	suppressContentEditableWarning: true
};

export const TextBoxDetalhamento = styled(Box)({
	padding: '4px 16px 16px 16px', 
	outline: 'none'
});
TextBoxDetalhamento.defaultProps = {
	component:'div' ,
	role:'textbox',
	contentEditable: 'true' ,
	suppressContentEditableWarning: true
};

export const Actions = styled(Box)(({theme})=>({
	display: 'flex', 
	justifyContent: 'end', 
	margin: '0 16px 12px',
	'& .MuiButtonBase-root:hover': {
		color: theme.palette.primary.main
	}
}));