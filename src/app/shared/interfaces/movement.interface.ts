export interface Movement {
    id?: number;
    nome: string
    descricao: string;
    data: Date;
    tipoMovimentacao: string;
    valor: number;
    //pessoaFisicaId: number;
    categoriaId: number;
}
