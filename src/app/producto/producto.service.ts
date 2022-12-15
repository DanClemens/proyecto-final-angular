import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Producto } from './interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase:string="http://localhost:8087/api/productos";

  constructor(private http:HttpClient,private servicioUsuario:UsuarioService) { }

  httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  addAuthorizationHeader():any{

    let token = this.servicioUsuario.token;

    if(token != null){
      console.log("token no nulo en producto");
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }

    console.log("token nulo en producto");

    return this.httpHeaders;
  }

  mostrarProducto():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlBase);
  }

  //insertar cliente
  guardarProducto(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>(this.urlBase,producto,{headers: this.addAuthorizationHeader()});
  }

  //buscar cliente por id
  getProducto(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlBase}/${id}`,{headers: this.addAuthorizationHeader()});
  }

  //actualizar cliente
  update(producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.urlBase}/${producto.id}`,producto,{headers: this.addAuthorizationHeader()})
  }

  //eliminar cliente
  delete(id:number):Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlBase}/${id}`,{headers: this.addAuthorizationHeader()});
  }




}
