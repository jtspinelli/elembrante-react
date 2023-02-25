import { styled } from '@mui/material';

export const FormSection = styled('section')({
	width: 400, margin: '0 auto', marginBottom: '40px', marginTop: '20px'
});

export const LembretesSection = styled('section')({
	display: 'flex', flexWrap: 'wrap', gap: '20px' 
});

export 	const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: 'none',
	borderRadius: '8px',
	boxShadow: 24,
	p: 0,
};

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
	drawerwidth: string;
  }>(({ theme, open, drawerwidth }) => ({
  	flexGrow: 1,
  	padding: theme.spacing(3),
  	transition: theme.transitions.create('margin', {
	  easing: theme.transitions.easing.sharp,
	  duration: theme.transitions.duration.leavingScreen,
  	}),
  	marginLeft: `-${drawerwidth}`,
  	...(open && {
	  transition: theme.transitions.create('margin', {
  			easing: theme.transitions.easing.easeOut,
  			duration: theme.transitions.duration.enteringScreen,
	  }),
	  marginLeft: 0
  	}),
  }));