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

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'upSm' })<{
	open?: boolean;
	drawerwidth: string;
	upSm: boolean;
  }>(({ theme, open, drawerwidth, upSm }) => ({
  	flexGrow: 1,
  	minWidth: '300px',
  	padding: theme.spacing(3),
  	transition: theme.transitions.create('margin', {
	  easing: theme.transitions.easing.sharp,
	  duration: theme.transitions.duration.leavingScreen,
  	}),
  	...(upSm && {
  		marginLeft: `-${drawerwidth}`,
  	}),
  	...(open && upSm && {
	  transition: theme.transitions.create('margin', {
  			easing: theme.transitions.easing.easeOut,
  			duration: theme.transitions.duration.enteringScreen,
	  }),
	  marginLeft: 0
  	}),
  }));