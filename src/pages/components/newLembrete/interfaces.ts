export interface IFormProps {
  formData: {
    submit: React.FormEventHandler<HTMLFormElement>;
    descricao: string;
    detalhamento: string;
    setDescricao: React.Dispatch<React.SetStateAction<string>>;
    setDetalhamento: React.Dispatch<React.SetStateAction<string>>;
    resetForm: React.MouseEventHandler<HTMLButtonElement>;
  };
}
