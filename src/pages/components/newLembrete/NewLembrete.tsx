import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addLembrete } from "../../../feature/lembreteSlice";
import Lembrete from "../../../feature/Lembrete";
import Form from "./form";

const NewLembreteForm: React.FC = () => {
  const [descricao, setDescricao] = useState<string>("");
  const [detalhamento, setDetalhamento] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);

  const dispatch = useDispatch();

  function resetForm() {
    setDescricao("");
    setDetalhamento("");
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    editMode ? updateLembrete() : createLembrete();
  }

  function createLembrete() {
    const newLembrete: Lembrete = {
      id: uuid(),
      descricao,
      detalhamento,
      criadoEm: new Date(),
    };

    dispatch(addLembrete(newLembrete));

    resetForm();
  }

  function updateLembrete() {
    alert("update lembrete!");
  }

  return (
    <Form
      formData={{
        submit,
        descricao,
        detalhamento,
        setDescricao,
        setDetalhamento,
        resetForm,
      }}
    />
  );
};

export default NewLembreteForm;
