import { OperadorasAprovadas } from './OperadorasAprovadas';
import { OperadorasNegativas } from './OperadorasNegativas';

export class Dashboard {

    constructor() { }

    dataServidor: string;
    operadorasAprovadas: OperadorasAprovadas[];
    operadorasNegativas: OperadorasNegativas[];
    topAprovados: string;

}
