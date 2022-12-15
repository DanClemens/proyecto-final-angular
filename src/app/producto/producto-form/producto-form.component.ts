import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styles: [
  ]
})
export class ProductoFormComponent implements OnInit {

  producto:Producto={
    id:0,
    nombre:''
  };

  constructor(private activeRoute:ActivatedRoute,
              private servicio:ProductoService,
              private router:Router,
              private servicioUsuario:UsuarioService) { }

  ngOnInit(): void {

    if(this.servicioUsuario.token==''){
      swal("No esta logeado","usuario no logeado","info");
      this.router.navigate(['/login']);
    }else{
      this.activeRoute.paramMap.subscribe(
        params => {
          let id = params.get('id');

          if(id){
            this.servicio.getProducto(parseInt(id)).subscribe(
              resp=>{
                this.producto=resp;
              }
            );
          }
        }
      );
    }
  }

  nuevoProducto():void{

    this.servicio.guardarProducto(this.producto).subscribe(
      resp=> {console.log(resp);
      swal('Nuevo Producto',`${this.producto.nombre} creado correctamente`,'success');
      this.router.navigate(['/productos']);
    },
    error => {
      console.log("error: ",error);
        swal("Error",`error al crear producto ${error.status}`,'error');

    }
    );
  }

  editarProducto():void{

    this.servicio.update(this.producto).subscribe(
      resp=> {console.log(resp);
      swal('Producto editado',`${this.producto.nombre} editado correctamente`,'success');
      this.router.navigate(['/productos']);
    },
    error => {
      console.log("error: ",error);
        swal("Error",`error al editar producto ${error.status}`,'error');

    }
    );
  }


}
