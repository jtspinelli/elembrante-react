interface Lembrete {
  id: string;
  descricao: string | null;
  detalhamento: string | null;
  criadoEm: Date;
  excluido: boolean;
  userId: string;
}

export default Lembrete;
