import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { Propietario } from 'src/app/interfaces/propietario';
import { PropietarioService } from 'src/app/services/propietario.service';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.scss']
})
export class PropietarioComponent implements OnInit {
  myForm!: FormGroup;
  datosPropietario: Array<Propietario> = [];
  datosCiudad: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private servicepropietario: PropietarioService, private http: HttpClient) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nmid: [],
      tipo_doc: [''],
      documento: [''],
      nombre_propietario: [''],
      direccion: [''],
      telefono: [''],
      ciudad: []
    })

    //Listar propietarios
    let arrayPropietario: Array<Propietario> = [];
    this.servicepropietario.getPropietarios().subscribe(datos => {
      this.datosPropietario = datos.dato;
      console.log(datos);
      console.log(datos.nombre_ciudad);
    });

    //Listar ciudades
    let arrayCiudad: Array<Ciudad> = [];
    this.servicepropietario.getCiudades().subscribe(datos => {
      this.datosCiudad = datos.dato;
    });
  }

  //Recargar datos a la tabla
  refresh() {
    let arrayPropietario: Array<Propietario> = [];
    this.servicepropietario.getPropietarios().subscribe(datos => {
      this.datosPropietario = datos.dato;
    });
  }

  //Guardar propietario
  guardar(form: FormGroup) {
    if (this.myForm.valid) {
      const ciudad: Ciudad = {
        nmid: this.myForm.get('ciudad')?.value,
        nombre_ciudad: '',
        codigo: 0
      }
      let parametros: any
      parametros = {
        nmid: this.myForm.get('nmid')?.value,
        tipo_doc: this.myForm.get('tipo_doc')?.value,
        documento: this.myForm.get('documento')?.value,
        nombre_propietario: this.myForm.get('nombre_propietario')?.value,
        direccion: this.myForm.get('direccion')?.value,
        telefono: this.myForm.get('telefono')?.value,
        ciudad: ciudad
      }
      this.servicepropietario.createPropietarios(parametros).subscribe(dato => {
        this.refresh();
        this.myForm.reset();
        alert('Propietario registrado exitosamente!');

      });

    } else {
      alert('Error al guardar, por favor verifique que todos los campos esten llenos')
    }

  }

  //editar datos y enviar a los campos correspondientes de C/U
  editar(datos: any) {
    this.myForm.setValue({
      nmid: datos.nmid,
      tipo_doc: datos.tipo_doc,
      documento: datos.documento,
      nombre_propietario: datos.nombre_propietario,
      direccion: datos.direccion,
      telefono: datos.telefono,
      ciudad: datos.nmid_ciudad
    });

  }

  //Metodo eliminar propietario
  eliminara(item: any) {
    if (confirm('¿Esta seguro de eliminar este registro?')) {
      this.servicepropietario.eliminarPropietario(item).subscribe(datos => {
        this.refresh();
        alert('Propietario eliminado');
      });
    }
  }

}
