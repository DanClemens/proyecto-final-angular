import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Cliente } from './interfaces/cliente.interface';
import { Region } from './interfaces/region.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlBase:string="http://localhost:8087/api/clientes";

  constructor(private http:HttpClient,private servicioUsuario:UsuarioService) { }

  httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  addAuthorizationHeader():any{

    let token = this.servicioUsuario.token;

    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }

    return this.httpHeaders;
  }


  mostrarCliente():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlBase);
  }

  //insertar cliente
  guardarCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlBase,cliente,{headers: this.addAuthorizationHeader()});
  }

  //buscar cliente por id
  getCliente(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlBase}/${id}`,{headers: this.addAuthorizationHeader()});
  }

  //actualizar cliente
  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlBase}/${cliente.id}`,cliente,{headers: this.addAuthorizationHeader()})
  }

  //eliminar cliente
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlBase}/${id}`,{headers: this.addAuthorizationHeader()});
  }

  //mostrar regiones
  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(`${this.urlBase}/regiones`,{headers: this.addAuthorizationHeader()});
  }

  //subir imagen
  subirImagen(archivo:File, id:any):Observable<HttpEvent<any>>{

    let formData = new FormData();
    formData.append('archivo',archivo);
    formData.append('id',id);

    let httpHeaders = new HttpHeaders();
    let token = this.servicioUsuario.token;

    if(token != null){
      httpHeaders = httpHeaders.append('Authorization','Bearer '+token);
    }

    const req = new HttpRequest('POST',`${this.urlBase}/uploads`,formData,{headers: httpHeaders});

    return this.http.request(req).pipe(
      resp => resp
    );
  }

}
