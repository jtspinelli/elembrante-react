export interface IValidations {
	nomePass: boolean | undefined; 
	usernamePass: string;
	senha: {
		senhaPass: boolean | undefined,
		lengthPass: boolean | undefined,
		hasLetterPass: boolean | undefined,
		hasNumberPass: boolean | undefined,
		hasSpecialCharPass: boolean | undefined
	},
	confirmSenhaPass: boolean | undefined
}

export const validationsInit = {
	nomePass: undefined,
	usernamePass: '',
	senha: {
		senhaPass: undefined,
		lengthPass: undefined,
		hasLetterPass: undefined,
		hasNumberPass: undefined,
		hasSpecialCharPass: undefined,
	},
	confirmSenhaPass: undefined
};