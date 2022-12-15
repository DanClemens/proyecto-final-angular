import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente-main',
  templateUrl: './cliente-main.component.html',
  styleUrls: ['./cliente-main.component.css']
})
export class ClienteMainComponent implements OnInit {


  imgSrc!:string;

  constructor(private servicio:ClienteService, public servicioUsuario:UsuarioService) { }


  clientes:Cliente[]=[];
  ngOnInit(): void {

    this.imgSrc="/assets/avatar.jpg";

    this.servicio.mostrarCliente().subscribe(
      resp=> {this.clientes=resp;console.log(this.clientes)}
    );

  }

  borrarCliente(cliente:Cliente){

    swal({
      title:"Esta seguro?",
      text:`Seguro que desea eliminar al cliente ${cliente.nombre}`,
      type:'warning',
      showCancelButton:true,
      confirmButtonText:'Si, eliminar!',
      cancelButtonText:'No, cancelar',
      confirmButtonClass:'btn btn-info',
      cancelButtonClass:'btn btn-danger',
      buttonsStyling:false,
      reverseButtons:true
    }).then(
      (result)=>{
        if(result.value){
          this.servicio.delete(cliente.id).subscribe(
            resp=>{
              this.clientes=this.clientes.filter(cli=> cli !==cliente);
              swal('Cliente eliminado',`Cliente ${cliente.nombre} eliminado correctamente`,'success');
            }
          );
        }
      }
    );

  }

}
