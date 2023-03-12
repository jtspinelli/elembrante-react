import React, { useEffect, useState } from 'react';
import { SnackbarKey, useSnackbar } from 'notistack';
import Lembrete from '../types/Lembrete';
import { Button } from '@mui/material';
import { setModalOpen } from '../../features/editModal/editModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { archiveOne, recoverOne } from '../../features/lembretes/lembreteSlice';
import store, { RootState } from '../store';
import { archiveLembrete } from '../../features/lembretes/thunks';
// import { addLembrete, removeLembrete, updateLembrete } from '../../features/lembretes/lembreteSlice';

const useSafeRemove = () => {
	const [ lembrete, setLemb ] = useState<Lembrete>();
	const [ operation, _setOperation ] = useState<string>('');
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);

	function safeRemove(lembrete: Lembrete){
		setOperation('delete', lembrete);
	}

	function safeArchive(lembrete: Lembrete){
		setOperation('archive', lembrete);
	}

	function setOperation(operation: string, lembrete: Lembrete){
		_setOperation(operation);
		setLemb(lembrete);
	}

	useEffect(() => {
		if(!lembrete || !loggedUser) return;

		if(operation === 'archive') dispatch(archiveOne(lembrete.id));

		showSnackbar();
	}, [lembrete]);

	// useEffect(() => {
	// 	if(!lembrete) return;

	// 	if(operation === 'delete') dispatch(removeLembrete(lembrete.id));
	// 	if(operation === 'archive') dispatch(updateLembrete({ id: lembrete.id, changes: { excluido: true } }));

	// 	showSnackbar();

	// 	dispatch(setModalOpen(false));
	// }, [lembrete]);

	// function revertRemove(lembrete: Lembrete, key: SnackbarKey){
	// 	dispatch(addLembrete(lembrete));
	// 	closeSnackbar(key);
	// }

	// function revertArchive(lembrete: Lembrete, key: SnackbarKey){
	// 	dispatch(updateLembrete({id: lembrete.id, changes: { excluido: false }}));
	// 	closeSnackbar(key);
	// }

	// function showSnackbar(){
	// 	enqueueSnackbar(`Lembrete ${ operation === 'delete' ? 'excluído' : 'arquivado' }.`, {
	// 		action: (key) => {
	// 			if(!lembrete) return <></>;
	// 			const revert = () => operation === 'delete' ? revertRemove(lembrete, key) : revertArchive(lembrete, key);
	// 			return <Button sx={{ color: 'orange' }} onClick={revert}>Desfazer</Button>;
	// 		}
	// 	});
	// }

	function revertArchive(lembrete: Lembrete, key: SnackbarKey) {
		dispatch(recoverOne(lembrete.id));
		closeSnackbar(key);
	}

	function revertRemove(lembrete: Lembrete, key: SnackbarKey) {
		// dispatch(undoRemove)
		closeSnackbar(key);
	}

	function showSnackbar(){
		enqueueSnackbar(`Lembrete ${ operation === 'delete' ? 'excluído' : 'arquivado' }.`, {
			action: (key) => {
				if(!lembrete) return <></>;
				const revert = () => operation === 'delete' ? revertRemove(lembrete, key) : revertArchive(lembrete, key);
				return <Button sx={{ color: 'orange' }} onClick={revert}>Desfazer</Button>;
			},
			onClose: (_, reason) => {
				if(!lembrete || !loggedUser) return;

				if(reason === 'timeout') {
					//persist archive
					store.dispatch(archiveLembrete({ id: lembrete.id, accessToken: loggedUser.accessToken }));
				}
			}
		});
	}

	return { safeRemove, safeArchive };
};

export default useSafeRemove;