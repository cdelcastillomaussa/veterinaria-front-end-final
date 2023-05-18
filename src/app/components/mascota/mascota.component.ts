import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Especie } from 'src/app/interfaces/especie';
import { Mascota } from 'src/app/interfaces/mascota';
import { Propietario } from 'src/app/interfaces/propietario';
import { MascotaService } from 'src/app/services/mascota.service';
import { PropietarioService } from 'src/app/services/propietario.service';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent implements OnInit {
  myForm!: FormGroup;
  datosMascota: Array<Mascota> = [];
  datosEspecie: any;
  datosPropietario: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private serviceMascota: MascotaService, private servicepropietario: PropietarioService, private http: HttpClient) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nmid: [],
      nombre_mascota: [''],
      especie: [],
      raza: [''],
      f_naci: [''],
      propietario: [],
      f_reg: ['']
    });

    //Listar mascotas
    let arrayMascota: Array<Mascota> = [];
    this.serviceMascota.getMascotas().subscribe(datos => {
      this.datosMascota = datos.dato;
      console.log(datos);
    });

    //Listar especies
    let arrayEspecie: Array<Especie> = [];
    this.serviceMascota.getEspecies().subscribe(datos => {
      this.datosEspecie = datos.dato;
    });

    //Listar propietarios
    let arrayPropietario: Array<Propietario> = [];
    this.servicepropietario.getPropietarios().subscribe(datos => {
      this.datosPropietario = datos.dato;
      console.log(datos);
    });
  }

  //Recargar datos a la tabla mascota
  refresh() {
    let arrayMascotas: Array<Mascota> = [];
    this.serviceMascota.getMascotas().subscribe(datos => {
      this.datosMascota = datos.dato;
    });
  }

  //Guardar mascota
  guardar(form: FormGroup) {
    if (this.myForm.valid) {

      const especie: Especie = {
        nmid: this.myForm.get('especie')?.value,
        nombre_especie: ''
      }

      const propietario: Propietario = {
        nmid: this.myForm.get('propietario')?.value,
        tipo_doc: '',
        documento: '',
        nombre_propietario: '',
        direccion: '',
        telefono: '',
        nombre_ciudad: '',
        codigo: 0
      }

      let parametros: any
      parametros = {
        nmid: this.myForm.get('nmid')?.value,
        nombre_mascota: this.myForm.get('nombre_mascota')?.value,
        especie: especie,
        raza: this.myForm.get('raza')?.value,
        f_naci: this.myForm.get('f_naci')?.value,
        propietario: propietario,
        f_reg: this.myForm.get('f_reg')?.value
      }
      this.serviceMascota.createMascota(parametros).subscribe(dato => {
        this.refresh();
        this.myForm.reset();
        alert('Mascota registrada exitosamente!');

      });

    } else {
      alert('Error al guardar, por favor verifique que todos los campos esten llenos')
    }

  }

  //editar datos y enviar a los campos correspondientes de C/U
  editar(datos: any) {
    const f_naci = new Date(datos.f_naci);
    f_naci.setDate(f_naci.getDate() + 1);
    const f_reg = new Date(datos.f_reg);
    f_reg.setDate(f_reg.getDate() + 1);
    this.myForm.setValue({
      nmid: datos.nmid,
      nombre_mascota: datos.nombre_mascota,
      especie: datos.nmid_especie,
      raza: datos.raza,
      f_naci: f_naci,
      propietario: datos.nmid_propietario,
      f_reg: f_reg
    });

  }

  //Metodo eliminar mascota
  eliminara(item: any) {
    if (confirm('¿Esta seguro de eliminar este registro?')) {
      this.serviceMascota.eliminarMascota(item).subscribe(datos => {
        this.refresh();
        alert('Mascota eliminada');
      });
    }
  }



}
