import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from '../clases/usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  usuario:Usuario=new Usuario();

  constructor(private servicio:UsuarioService, private router:Router) { }

  ngOnInit(): void {

    if(this.servicio.token){
      swal('Aviso','Ya estas logeado','info');
      this.router.navigate(['']);
    }

  }

  login():void{

    this.servicio.login(this.usuario).subscribe(
      resp=>{
        console.log(resp.access_token);
        this.servicio.guardarToken(resp.access_token);
        this.servicio.guardarUsuario(resp.access_token);
        swal('Login',`Hola ${this.usuario.username}`,'success');
        this.router.navigate(['']);
      },
      error=>{
        console.log(error);
        swal('Error login',`Error: ${error.status}`,'error');
      }
    );

  }

}
