import { styled, Box } from '@mui/material';

export const LembreteContainer = styled(Box)({
	border: '1px solid gainsboro',
	borderRadius: '8px',
	width: 'calc(25% - 20px * .75)',	
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',						
	'&:hover': {
		boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)',
		'& #action-area': {
			opacity: 1
		}
	},
	'&>*': {
		cursor: 'default'
	}
});

export const Titulo = styled(Box)({
	fontWeight: 500, color: '#2b2b2b', padding: '12px 16px 0'
});

export const Detalhamento = styled(Box)({
	padding: '10px 16px 16px'
});

export const Actions = styled(Box)({
	display: 'flex',
	justifyContent: 'end',
	transition: '.22s',
	transitionTimingFunction: 'ease-in', 
	opacity: '0'
});