
import { Marca } from './Marca';

export class Unidade {

    constructor() { }

    uniD_COD_UNIDADE: number;
    uniD_NOM_UNIDADE: string;
    marC_COD_MARCA: number;
    marC_NOM_MARCA: string;
    regI_NOM_REGIONAL: string;
    uniD_TXT_RESPONSAVEL: string;
    uniD_TXT_TELEFONE: string;
    uniD_TXT_ENDERECO: string;
    tipoUnidade: string;
    marcas: Marca[];
}
