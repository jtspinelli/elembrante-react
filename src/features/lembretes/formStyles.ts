import { Box, Paper, styled } from '@mui/material';

interface PlaceholderProps {
	'for-titulo': string;
	'form-expanded': string;
}

export const CustomPaper = styled(Paper)((props: { 'form-expanded': string }) => ({
	display: 'flex',
	flexDirection: 'column',
	padding: '15px 20px',
	width: '100%',
	boxShadow: props['form-expanded'] === 'true' ? '0 1px 5px 0 rgb(60 64 67 / 60%), 0 2px 6px 2px rgb(60 64 67 / 15%)' : '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
	border: '1px solid gainsboro',
	borderRadius: '8px',
}));
CustomPaper.defaultProps = {
	id: 'form'
};

export const BoxTitulo = styled(Box)({
	position: 'relative',
	marginBottom: '20px'
});
BoxTitulo.defaultProps = {
	id:'form-titulo-container'
};

export const BoxDetalhamento = styled(Box)({
	position: 'relative'
});
BoxDetalhamento.defaultProps = {
	id:'form-detalhamento-container'
};

export const Placeholder = styled(Box)((props: PlaceholderProps) => ({
	fontFamily: 'Roboto', 
	fontWeight: 500, 
	opacity: .71, 
	position: 'absolute',
	top: 0, 
	pointerEvents: 'none',
	fontSize: '16px',
	...(props['for-titulo'] === 'false' && props['form-expanded'] === 'true' && { fontSize: textBoxDetalhamentoFontSize })	
}));

const textBoxStyle = {
	fontFamily:'Roboto',
	fontWeight: 500, 
	fontSize: '16px', 
	outline: 'none'
};

const textBoxDefaultProps = {
	role: 'textbox', 
	contentEditable: true,
};

const textBoxDetalhamentoFontSize = '14px';

export const TextBoxTitulo = styled(Box)(textBoxStyle);
TextBoxTitulo.defaultProps = { ...textBoxDefaultProps, id: 'form-titulo' };

export const TextBoxDetalhamento = styled(Box)({...textBoxStyle, fontWeight: 400, fontSize: textBoxDetalhamentoFontSize});
TextBoxDetalhamento.defaultProps = { ...textBoxDefaultProps, id: 'form-detalhamento' };