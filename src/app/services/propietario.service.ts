import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propietario } from '../interfaces/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
  servidor = 'http://localhost:8080/api'

  constructor(private servicio: HttpClient) { }

  getPropietarios():Observable<any>{
    return this.servicio.get(`${this.servidor}/propietario/propietarios`);
  }

  // Consumo el servicio de obtener las ciudades
  getCiudades():Observable<any>{
    return this.servicio.get(`${this.servidor}/ciudad/mostrar_ciudad`);
  }

  createPropietarios(propietario: Propietario){
    return this.servicio.post(`${this.servidor}/propietario/createpropietario`, propietario);
  }

  eliminarPropietario(nmid: number){
    return this.servicio.delete(`${this.servidor}/propietario/deletepropietario/${nmid}`);
  }
}
