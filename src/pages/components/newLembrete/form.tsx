import { Box, Button, TextField, Typography } from "@mui/material";
import { IFormProps } from "./interfaces";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";

const Form: React.FC<IFormProps> = (props: IFormProps) => {
  return (
    <Box
      component="form"
      onSubmit={props.formData.submit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:before": {
          borderBottom: "1px solid gainsboro",
        },
      }}
    >
      <Typography variant="h3">Novo lembrete</Typography>

      <TextField
        variant="standard"
        label="Descrição"
        value={props.formData.descricao}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => props.formData.setDescricao(e.target.value)}
      />

      <TextField
        variant="standard"
        label="Detalhamento"
        value={props.formData.detalhamento}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => props.formData.setDetalhamento(e.target.value)}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <Button
          type="reset"
          variant="outlined"
          onClick={props.formData.resetForm}
          startIcon={<ClearIcon />}
        >
          Limpar
        </Button>

        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
