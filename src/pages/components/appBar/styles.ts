import { styled } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';


export interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
	drawerWidth?: string;
}

export const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
	  easing: theme.transitions.easing.sharp,
	  duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
	  width: `calc(100% - ${drawerWidth})`,
	  marginLeft: `${drawerWidth}`,
	  transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
	  }),
	}),
}));