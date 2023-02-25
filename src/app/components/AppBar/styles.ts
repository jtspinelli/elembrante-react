import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Box, styled, Toolbar as MuiToolbar, Typography } from '@mui/material';

export interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
	drawerwidth?: string;
	upsm?: number;
}

export const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, drawerwidth, upsm }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
	  easing: theme.transitions.easing.sharp,
	  duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && upsm && {
	  width: `calc(100% - ${drawerwidth})`,
	  marginLeft: `${drawerwidth}`,
	  transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
	  }),
	}),
}));

export const AppIcon = styled(Box)(({theme}) => ({
	width: '50%', 
	display: 'flex', 
	svg: { width: '100%' }, 
	[theme.breakpoints.down('ssm')]: { 
		svg: { width: '80%' }
	}
}));

export const AppTitle = styled(Typography)(({theme}) => ({
	marginLeft: '10px', 
	[theme.breakpoints.down('ssm')]: { 
		marginLeft: 0
	}
}));

export const Toolbar = styled(MuiToolbar)({
	display: 'flex', 
	justifyContent: 'space-between',
	'&>div': {
		display: 'flex', 
		alignItems: 'center'
	}
});