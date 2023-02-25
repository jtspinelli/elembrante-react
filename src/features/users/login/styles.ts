import { Box, Button, styled } from '@mui/material';

export const transitionDuration = 300;

export const Container = styled(Box)(( { theme }) => ({
	display: 'flex', 
	width: '200%', 
	marginLeft: 0,
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
	  	duration: `${transitionDuration}ms`,
	}),
	position: 'relative'
}));

const smallWidthScreensFormStyles = {
	padding: '0 24px'
};

export const Form = styled(Box)(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	width: '100%',
	padding: '0 48px',
	[theme.breakpoints.down('sm')]: smallWidthScreensFormStyles
}));
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

export const ButtonGoogleLogin = styled(Button) (({theme})=> ({
	textTransform: 'none',
	color: theme.palette.secondary.main,
	position: 'absolute',
	top: 'calc(50% - (380px / 2) - 40px)',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	img: {
		marginRight: '10px'
	}
}));