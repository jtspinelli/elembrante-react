interface Lembrete {
  id?: number;
  titulo: string;
  descricao: string;
  criadoEm: Date;
  arquivado: boolean;
  usuarioId: string;
}

export default Lembrete;
