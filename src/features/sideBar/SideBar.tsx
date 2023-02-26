import React from 'react';
import { IconButton, useTheme, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, DrawerHeader, List, ActiveMark } from './styles';
import { RootState } from '../../app/store';
import { setOpen } from './sideBarSlice';
import { NavLink } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

const CustomDrawer: React.FC = () => {
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);
	const theme = useTheme();
	const downMd = useMediaQuery(theme.breakpoints.down('md'));
	const dispatch = useDispatch();

	const closeDrawer = () => {
		dispatch(setOpen(false));
	};

	function closeIfVerticalScreen(){
		if(downMd) closeDrawer();
	}

	return (
		<Drawer width={width} open={open}>
			<DrawerHeader>
				<IconButton onClick={closeDrawer}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>

			<Divider />

			<List>
				<NavLink to='/' className={(navData) => (navData.isActive ? 'active' : '')}>
					<ListItem key={'main'} disablePadding>
						<ActiveMark />
						<ListItemButton onClick={closeIfVerticalScreen}>
							<ListItemIcon className='link-icon'> <NoteAltOutlinedIcon /> </ListItemIcon>
							<ListItemText primary='Meus lembretes' />
						</ListItemButton>
					</ListItem>
				</NavLink>

				<NavLink to='/arquivo' className={(navData) => (navData.isActive ? 'active' : '')}>
					<ListItem key={'archive'} disablePadding>
						<ActiveMark />
						<ListItemButton onClick={closeIfVerticalScreen}>
							<ListItemIcon className='link-icon'> <ArchiveOutlinedIcon /> </ListItemIcon>
							<ListItemText primary='Arquivo' />
						</ListItemButton>
					</ListItem>
				</NavLink>
			</List>
		</Drawer>
	);
};

export default CustomDrawer;

