import { Box, styled } from '@mui/material';

export const Page = styled(Box)({
	height: '100%',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

const smallWidthContainerStyles = {
	width: '100%',
	border: 'none'
};

export const Container = styled(Box)(({theme}) => ({
	width: '450px',
	padding: '48px 0',
	borderRadius: '8px',
	border: '1px solid gainsboro',
	overflow: 'hidden',
	[theme.breakpoints.down('sm')]: smallWidthContainerStyles
}));