import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioI } from 'src/app/interfaces/UsuarioInterfaz';
import { LoginI } from 'src/app/interfaces/LoginInterfaz';
import { RespuestaI } from 'src/app/interfaces/RespuestaUsuario';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:string = "http://127.0.0.1:8080";
  constructor(private http:HttpClient) { }


login(form:LoginI): Observable<RespuestaI> {
  let endpoint = this.url + "/usuario/login";
  return this.http.post<RespuestaI>(endpoint,form);
}

}


