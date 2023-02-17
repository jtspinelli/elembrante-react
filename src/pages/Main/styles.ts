import { styled } from '@mui/material';

export const FormSection = styled('section')({
	width: 400, margin: '0 auto', marginBottom: '40px', marginTop: '20px'
});

export const LembretesSection = styled('section')({
	display: 'flex', flexWrap: 'wrap', gap: '20px' 
});

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
	drawerWidth: string;
  }>(({ theme, open, drawerWidth }) => ({
  	flexGrow: 1,
  	padding: theme.spacing(3),
  	transition: theme.transitions.create('margin', {
	  easing: theme.transitions.easing.sharp,
	  duration: theme.transitions.duration.leavingScreen,
  	}),
  	marginLeft: `-${drawerWidth}`,
  	...(open && {
	  transition: theme.transitions.create('margin', {
  			easing: theme.transitions.easing.easeOut,
  			duration: theme.transitions.duration.enteringScreen,
	  }),
	  marginLeft: 0
  	}),
  }));