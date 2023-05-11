import { Especie } from "./especie";
import { Propietario } from "./propietario";

export interface Mascota extends Especie, Propietario {
  nmid: number,
  nombre_mascota: string,
  especie: Especie,
  raza: string,
  f_naci: Date,
  propietario: Propietario,
  f_reg: Date
}
