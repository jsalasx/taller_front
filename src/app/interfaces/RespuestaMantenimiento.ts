import { MantenimientoI } from './MantenimientosInterfaz';

export interface RespuestaMantenimientoI{
    errorMsg?: string;
    obj?: MantenimientoI[];
}
