import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../interfaces/cliente.interface';
import { Region } from '../interfaces/region.interface';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styles: [
  ]
})
export class ClienteFormComponent implements OnInit {

  regionNew!:Region;

  cliente:Cliente={
    nombre: '',
    id: 0,
    apellido: '',
    email: '',
    telefono: 0,
    createAt: null,
    imagen: '',
    region: this.regionNew
  };

  regiones!:Region[];

  constructor(private activeRoute:ActivatedRoute,
              private servicio:ClienteService,
              private router:Router,
              private servicioUsuario:UsuarioService) { }

  ngOnInit(): void {

    if(this.servicioUsuario.token==''){
      swal("No esta logeado","usuario no logeado","info");
      this.router.navigate(['/login']);
    }else{
      this.servicio.getRegiones().subscribe(
        resp => this.regiones=resp
      );

      this.activeRoute.paramMap.subscribe(
        params => {
          let id = params.get('id');

          if(id){
            this.servicio.getCliente(parseInt(id)).subscribe(
              resp=>{
                this.cliente=resp;
              }
            );
          }
        }
      );
    }


  }

  compararRegion(o1:Region,o2:Region):boolean{
    if(o1===undefined && o2 ===undefined){
      return true;
    }

    return o1===null || o2===null || o1===undefined || o2===undefined ? false:o1.id === o2.id;
  }

  nuevoCliente():void{

    this.servicio.guardarCliente(this.cliente).subscribe(
      resp=> {console.log(resp);
      swal('Nuevo Cliente',`${this.cliente.nombre} creado correctamente`,'success');
      this.router.navigate(['']);
    },
    error => {
      console.log("error: ",error);
        swal("Error",`error al crear cliente ${error.status}`,'error');

    }
    );
  }

  editarCliente():void{

    this.servicio.update(this.cliente).subscribe(
      resp=> {console.log(resp);
      swal('Cliente editado',`${this.cliente.nombre} editado correctamente`,'success');
      this.router.navigate(['']);
    },
    error => {
      console.log("error: ",error);
        swal("Error",`error al editar cliente ${error.status}`,'error');

    }
    );
  }

}
