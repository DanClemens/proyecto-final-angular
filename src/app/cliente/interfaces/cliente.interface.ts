import { Region } from "./region.interface";

export interface Cliente{

  id:number;
  nombre:string;
  apellido:string;
  email:string;
  telefono:number;
  createAt:Date | null;
  imagen:string;
  region:Region;

}
