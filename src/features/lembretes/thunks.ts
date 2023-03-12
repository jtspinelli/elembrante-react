import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Lembrete from '../../app/types/Lembrete';

export const getLembretes = createAsyncThunk(
	'lembretes/all',
	async (accessToken: string): Promise<Lembrete[]> => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return await axios
			.get(basePath + 'lembretes', {
				headers: {
					access_token: accessToken
				}
			})
			.then((response) => response.data)
			.catch(() => {return;});
	}
);