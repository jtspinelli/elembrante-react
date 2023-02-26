import { styled, SwipeableDrawer as MuiDrawer, List as MuiList, Box as MuiBox } from '@mui/material';

export const Drawer = styled(MuiDrawer)((props: { width: string }) => ({
	width: props.width,
	flexShrink: 0,
	'& .MuiDrawer-paper': {
		width: props.width,
		boxSizing: 'border-box',
	}
}));
Drawer.defaultProps = {
	anchor: 'left'
};


export const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

export const List = styled(MuiList)(({ theme }) => ({
	'&>*': {
		textDecoration: 'none',
		color: 'rgba(0, 0, 0, 0.87)'
	},		
	'& .active .active-mark': {
		backgroundColor: theme.palette.primary.main
	},
	'& .active .link-icon': {
		color: theme.palette.primary.main
	}
}));

export const ActiveMark = styled(MuiBox)({
	backgroundColor: 'transparent', 
	width: '4px', 
	height: '48px', 
	position: 'absolute'
});

ActiveMark.defaultProps = {
	className: 'active-mark'
};
