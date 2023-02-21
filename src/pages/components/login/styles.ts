import { Box, styled } from '@mui/material';

export const transitionDuration = 300;

export const Container = styled(Box)(( { theme }) => ({
	display: 'flex', 
	width: '200%', 
	marginLeft: 0,
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
	  	duration: `${transitionDuration}ms`,
	})
}));

export const Form = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	padding: '0 48px'
});
Form.defaultProps = {
	component: 'form'
};

export const Actions = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	'& a': {
		textDecoration: 'none'
	}
});