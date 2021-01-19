
import { Marca } from './Marca';

export class Unidade {

    constructor() { }

    uniD_COD_UNIDADE: number;
    uniD_NOM_UNIDADE: string;
    marC_COD_MARCA: number;
    marC_NOM_MARCA: string;
    regI_COD_REGIONAL: number;
    regI_NOM_REGIONAL: string;
    uniD_TXT_RESPONSAVEL: string;
    uniD_TXT_TELEFONE: string;
    uniD_TXT_CELULAR: string;
    uniD_TXT_ENDERECO: string;
    uniD_NOM_CONTATO_PRI_NIVEL: string;
    uniD_TXT_PRI_TELEFONE: string;
    uniD_TXT_PRI_CEL: string;
    tipoUnidade: string;
    tiuN_SKU_TIPO_UNIDADE: number;
    marcas: Marca[];
}
