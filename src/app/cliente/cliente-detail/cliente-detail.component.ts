import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styles: [
  ]
})
export class ClienteDetailComponent implements OnInit {

  cliente!:Cliente;
  fotoSelec!:File;

  constructor(private servicioCliente:ClienteService,
              private activeRoute:ActivatedRoute,
              private servicioUsuario:UsuarioService,
              private router:Router) { }

  ngOnInit(): void {

    if(this.servicioUsuario.token==''){
      swal("No esta logeado","usuario no logeado","info");
      this.router.navigate(['/login']);
    }else{

    this.activeRoute.paramMap.subscribe(
      params=>{

        let id = params.get('id');

        if(id){
          this.servicioCliente.getCliente(parseInt(id)).subscribe(
            resp=>{
              this.cliente=resp;
            }
          );
        }
      }
    );
    }
  }

  seleccionarImagen(event:any):void{

    this.fotoSelec=event.target.files[0];

  }

  subirImagen():void{

    if(!this.fotoSelec){
      swal('Error','Debe seleccionar una imagen','error');
    }else{
      this.servicioCliente.subirImagen(this.fotoSelec,this.cliente.id).subscribe(
        event=>{
          if(event.type===HttpEventType.Response){
            let response:any = event.body;
            this.cliente = response.cliente as Cliente;
            swal('La imagen se ha subido correctamente',response.mensaje,'success');
          }
    }
    );
    }
  }

}
