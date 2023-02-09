import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../servicios/login/login.service';
import { LoginI } from '../interfaces/LoginInterfaz';
import { Router } from '@angular/router';
import { RespuestaI } from '../interfaces/RespuestaUsuario';
import { UsuarioI } from '../interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    usuario: new FormControl('drk', Validators.required),
    clave: new FormControl('1234', Validators.required)
  })

  constructor(private api:LoginService, private router:Router) { }
  errorStatus: boolean = false;
  errorMsj:any = "";
  onLogin() {
    let login:LoginI = {
      usuario: this.loginForm.value.usuario || "",
      clave: this.loginForm.value.clave || ""
    }
    this.api.login(login).subscribe((data: RespuestaI) => {
      if (data.obj == null) {
        this.errorStatus = true;
        this.errorMsj = data.errorMsg;
      } else {
        this.errorStatus = false;
        this.errorMsj = "";
        let Usuario:UsuarioI = data.obj;
        //console.log(Usuario);
        this.router.navigate(['mantenimiento']);
      }

    });

  }
}
