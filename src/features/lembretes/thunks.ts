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

export const archiveLembrete = createAsyncThunk(
	'lembretes/update',
	async (data: {id: number, accessToken: string}): Promise<number> => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return await axios.put(basePath + 'lembrete/archive/' + data.id, {}, {
			headers: {
				access_token: data.accessToken
			}
		})
			.then(() => data.id)
			.catch(() => -1);
	}
);

export const recoverLembrete = createAsyncThunk(
	'lembretes/recover',
	async (data: { id: number, accessToken: string }): Promise<number> => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return await axios.put(basePath + 'lembrete/recover/' + data.id, {}, {
			headers: {
				access_token: data.accessToken
			}
		})
			.then(() => data.id)
			.catch(() => -1);
	}
);