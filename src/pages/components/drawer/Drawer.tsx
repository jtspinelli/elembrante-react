import React from 'react';
import { Drawer, IconButton, useTheme, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../feature/store';
import { setOpen } from '../../../feature/sideBarSlice';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { DrawerHeader } from './styles';

const CustomDrawer: React.FC = () => {
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);
	const theme = useTheme();
	const dispatch = useDispatch();

	const handleDrawerClose = () => {
		dispatch(setOpen(false));
	};

	return (
		<Drawer
			sx={{
				width: width,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width,
					boxSizing: 'border-box',
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{['Arquivo'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <ArchiveOutlinedIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>				
		</Drawer>
	);
};

export default CustomDrawer;

