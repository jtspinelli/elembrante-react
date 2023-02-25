import { styled, TextField, List, ListItem } from '@mui/material';

export const NomeTextField = styled(TextField)({
	margin: '40px 0 0'
});
NomeTextField.defaultProps = {
	label: 'Digite seu nome',
	inputProps: { maxLength: 30 }
};

export const UsernameTextField = styled(TextField)({
	margin: '40px 0 0', 
	input: { textTransform: 'lowercase' }
});
UsernameTextField.defaultProps = {
	label:'Nome de usuário',
	inputProps: { maxLength: 30 }
};

export const SenhaTextField = styled(TextField)({
	margin: '40px 0 0'
});
SenhaTextField.defaultProps = {
	label:'Senha',
	type: 'password'
};

export const ConfirmSenhaTextField = styled(TextField)({
	margin: '40px 0'
});
ConfirmSenhaTextField.defaultProps = {
	label:'Repita a senha',
	type:'password'
};

export const SenhaTextHelperList = styled(List)({
	fontSize: '0.75rem', 
	color: '#f44336', 
	paddingTop: '3px', 
	li: { padding: '0 0 0 14px' }
});

export const ValidationListItem = styled(ListItem)((props: { validator?: number }) => ({
	color: props.validator ? 'green' : 'unset',
	...(props.validator && {
		'&::before': {
			content: '"✓"',
			marginRight: '5px'
		}
	})
}));
