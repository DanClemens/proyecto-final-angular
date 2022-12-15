import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { Usuario } from 'src/app/usuario/clases/usuario';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  user_name!:string;
  constructor(public servicio:UsuarioService, private router:Router) { }

  ngOnInit(): void {

  }

  logout():void{
    this.user_name=this.servicio.usuario.username;
    this.servicio.logout();
    swal('Logout',`${this.user_name} cerro sesion`,'success');
    //this.router.navigate(['login']);
  }

}
