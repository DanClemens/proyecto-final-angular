import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-main',
  templateUrl: './producto-main.component.html',
  styleUrls: ['./producto-main.component.css']
})
export class ProductoMainComponent implements OnInit {

  constructor(private servicio:ProductoService, public servicioUsuario:UsuarioService) { }

  productos:Producto[]=[];

  ngOnInit(): void {

    this.servicio.mostrarProducto().subscribe(
      resp=> {this.productos=resp;console.log(this.productos)}
    );
  }


  borrarProducto(producto:Producto){

    swal({
      title:"Esta seguro?",
      text:`Seguro que desea eliminar al cliente ${producto.nombre}`,
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
          this.servicio.delete(producto.id).subscribe(
            resp=>{
              this.productos=this.productos.filter(cli=> cli !==producto);
              swal('Producto eliminado',`Producto ${producto.nombre} eliminado correctamente`,'success');
            },
            error=>{
              swal('Producto eliminado',`Producto ${producto.nombre} no es posible eliminar`,'error');
            }
          );
        }
      }
    );

  }

}
