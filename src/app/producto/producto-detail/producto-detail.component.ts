import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styles: [
  ]
})
export class ProductoDetailComponent implements OnInit {

producto!:Producto;

  constructor(private servicioProducto:ProductoService,
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
            this.servicioProducto.getProducto(parseInt(id)).subscribe(
              resp=>{
                this.producto=resp;
              }
            );
          }
        }
      );
      }
  }

}
