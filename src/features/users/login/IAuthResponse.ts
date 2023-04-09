export interface IAuthResponse {
	access_token: string;
	headerPayload: string;	
	userData: { nome: string, username: string };
}