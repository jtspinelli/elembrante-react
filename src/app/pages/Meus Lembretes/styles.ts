import { styled } from '@mui/material';

export const FormSection = styled('section')({
	width: 400, 
	margin: '0 auto', 
	marginBottom: '40px', 
	marginTop: '20px',
	'@media (max-width: 450px)': {
		width: '100%'
	}
});

export const LembretesSection = styled('section')({
	display: 'flex', flexWrap: 'wrap', gap: '20px' 
});