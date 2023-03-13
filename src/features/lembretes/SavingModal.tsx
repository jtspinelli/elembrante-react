import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const SavingModal: React.FC = () => {
	const { archiving, recovering, deleting, creating } = useSelector((state: RootState) => state.lembretesReducer);

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: 'none',
		borderRadius: '8px',
		outline: 'none',
		boxShadow: 24,
		p: 2,
		pointerEvents: 'none',
		'.MuiTypography-root': {
			margin: 0
		}
	};

	return (
		<>
			{ (archiving || recovering || deleting || creating ) &&
				<Modal
					open={true}
					aria-labelledby="saving"
					aria-describedby="modal displayed when saving changes to database"
				>
					<Box sx={style}>
						<Typography id="saving-changes-modal" sx={{ mt: 2 }}>
							Salvando alterações...
						</Typography>
					</Box>
				</Modal>
			}
		</>
	);
};


export default SavingModal;