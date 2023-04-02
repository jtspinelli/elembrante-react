import { IAuthResponse } from '../../features/users/login/IAuthResponse';
import axios from 'axios';

export async function authenticate(username: string, senha: string): Promise<IAuthResponse | null>{
	const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

	return await axios.post(basePath + 'auth', {username, senha})
		.then((response: {data: IAuthResponse}) => response.data)
		.catch(() => null );
}