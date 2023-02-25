import { Box, styled } from '@mui/material';

export const Page = styled(Box)({
	height: '100%',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const Container = styled(Box)({
	width: '450px',
	padding: '48px 0',
	borderRadius: '8px',
	border: '1px solid gainsboro',
	overflow: 'hidden'
});