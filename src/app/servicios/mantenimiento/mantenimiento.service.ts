import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaMantenimientoI } from 'src/app/interfaces/RespuestaMantenimiento';
import { MantenimientoI } from '../../interfaces/MantenimientosInterfaz';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  url:string = "http://127.0.0.1:8080";
  constructor(private http:HttpClient) { }

getAllMantenimientos() {
  let endpoint = this.url + "/mantenimiento";
  return this.http.get<RespuestaMantenimientoI>(endpoint);
}

guardarMantenimiento(form:MantenimientoI): Observable<RespuestaMantenimientoI> {
  let endpoint = this.url + "/mantenimiento";
  return this.http.post<RespuestaMantenimientoI>(endpoint,form);
}

buscarPorPlaca(form:MantenimientoI): Observable<RespuestaMantenimientoI> {
  let endpoint = this.url + "/mantenimiento/buscar";
  return this.http.post<RespuestaMantenimientoI>(endpoint,form);
}

cambiarEstadoPorId(form:MantenimientoI): Observable<RespuestaMantenimientoI> {
  let endpoint = this.url + "/mantenimiento/cambiarEstado";
  return this.http.post<RespuestaMantenimientoI>(endpoint,form);
}

}
