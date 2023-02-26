import { styled, Box } from '@mui/material';

export const LembreteContainer = styled(Box, { shouldForwardProp: (prop) => prop !== 'archived' && prop !== 'mainWidth' })<{
	archived: boolean;
	mainWidth: number;
}>(({archived, mainWidth}) => ({
	border: '1px solid gainsboro',
	borderRadius: '8px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	width: 'calc(25% - 20px * .75)',
	...(mainWidth <= 750 && mainWidth > 566 && {
		width: 'calc(33.33% - 20px * .667)'
	}),
	...(mainWidth <= 566 && mainWidth > 450 && {
		width: 'calc(50% - 20px * .5)'
	}),
	...(mainWidth <= 450 && {
		width: '100%'
	}),
	'&:hover': {
		boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)',
		'& #action-area': {
			opacity: 1
		}
	},
	'&>*': {
		cursor: 'default'
	},
	'& .MuiBox-root': {
		color: archived ? '#bbbbbb' : 'unset',
	}
}));

export const Titulo = styled(Box)({
	fontWeight: 500, color: '#2b2b2b', padding: '12px 16px 0'
});

export const Detalhamento = styled(Box)({
	padding: '10px 16px 16px',
	overflow: 'hidden',
	textOverflow: 'ellipsis'
});

export const Actions = styled(Box)(({theme})=>({
	display: 'flex',
	justifyContent: 'end',
	transition: '.22s',
	transitionTimingFunction: 'ease-in', 
	opacity: '0',
	'& .MuiButtonBase-root:hover': {
		color: theme.palette.primary.main
	}
}));