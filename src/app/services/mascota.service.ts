import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../interfaces/mascota';
@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  servidor = 'http://localhost:8080/api'

  constructor(private servicio: HttpClient) { }

  getMascotas():Observable<any>{
    return this.servicio.get(`${this.servidor}/mascota/mascotas`);
  }

  //Obtenemos las especies
  getEspecies():Observable<any>{
    return this.servicio.get(`${this.servidor}/especie/mostrar_especie`);
  }

  createMascota(mascota: Mascota){
    return this.servicio.post(`${this.servidor}/mascota/createmascota`, mascota);
  }

  eliminarMascota(nmid: number){
    return this.servicio.delete(`${this.servidor}/mascota/deletemascota/${nmid}`);
  }




}
