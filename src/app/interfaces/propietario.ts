import { Ciudad } from "./ciudad"

export interface Propietario extends Ciudad {
  nmid: number;
  tipo_doc: string;
  documento: string;
  nombre_propietario: string;
  direccion: string;
  telefono: string;
  //ciudad: Ciudad; //Esto es un detalle que estamos pasando un object


}
