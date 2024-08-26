import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IArmazon } from '../../models/armazon';
import { ArmazonService } from '../../servicios/armazon.service';
import { ToastrService } from 'ngx-toastr';
import { TipoMica, validarCamposRequeridos } from '../../../compartido/utilerias';
import { IlenteDeContacto, micaBifocal, micaMonofocal, micaProgresivo, tratamientosServicios } from '../../models/mica';
import { MicaMonofocalService } from '../../servicios/mica.monofocal.service.';

@Component({
  selector: 'app-mica-form',
  templateUrl: './mica-form.component.html',
  styleUrl: './mica-form.component.css'
})
export class MicaFormComponent {
  @Output('actualizar') actualizar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('addForm') addForm!: NgForm;
  TipoMica = TipoMica;


  titulo_agregar = "Agregar ";
  readonly titulo_editar = "Editar";
  mostrarForm: boolean = false;


  TipoMicaForm: TipoMica = TipoMica.Monofocal;
  micaObject: object = {} as object;
  monofocal: micaMonofocal = {} as micaMonofocal;
  progresivo: micaProgresivo = {} as micaProgresivo;
  bifocal: micaBifocal = {} as micaBifocal;
  tratamiento: tratamientosServicios = {} as tratamientosServicios;
  isEdit = false;
  constructor(private monoService: MicaMonofocalService,
    private toastr: ToastrService) { }

  cerrarForm(form: NgForm) {
    this.limpiar(form);
    this.mostrarForm = false;
  }

  abrirForm(mica: TipoMica) {
    this.TipoMicaForm = mica;
    console.log(this.TipoMicaForm);
    switch (mica) {
      case TipoMica.Monofocal:
        this.titulo_agregar = 'Agregar mica monofocal';
        break;
      case TipoMica.Progresivo:
        this.titulo_agregar = 'Agregrar mica progresivo';
        break;
      case TipoMica.Bifocal:
        this.titulo_agregar = 'Agregar mica bifocal';
        break;
      case TipoMica.Tratamiento:
        this.titulo_agregar = 'Agregar tratamiento y/o servicio';
        break;
      default:
        this.titulo_agregar = 'Agregar mica monofocal';
        break;
    }
    this.mostrarForm = true;
  }

  onGuardar(form: NgForm): void {
    switch (this.TipoMicaForm) {
      case TipoMica.Monofocal:
        this.micaObject = this.monofocal;
        break;
      case TipoMica.Progresivo:
        this.micaObject = this.progresivo;
        break;
      case TipoMica.Bifocal:
        this.micaObject = this.bifocal;
        break;
      case TipoMica.Tratamiento:
        this.micaObject = this.tratamiento;
        break;
      default:
        this.micaObject = this.monofocal;
        break;
    }
    if (this.isEdit) {
      this.onEditar(form,this.micaObject);
    } else {
      this.onAgregar(form,this.micaObject,this.monoService);
    }
  }

  onAgregar<T>(form: NgForm,item: T,service:any): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    console.log(item);
    //service.Agregar(item).subscribe({
    //  next: () => this.toastr.success('El registro fue agregado correctamente'),
    //  complete: () => {
    //    this.actualizarTabla();
    //    this.limpiar(form);
    //  },
    //  error: (err) => {
    //    this.toastr.error(err.error, 'Error', {
    //      timeOut: 4000,
    //      progressAnimation: 'increasing'
    //    })
    //  }
    //});
  }

  actualizarTabla() {
    this.actualizar.emit(true);
  }

  limpiar(form: NgForm): void {
    form.reset();
    this.isEdit = false;
    this.micaObject = {} as IArmazon;
  }

  cargarDatos(id: number): void {
    this.mostrarForm = true;
    this.isEdit = true;
    this.obtenerPorId(id);
  }

  obtenerPorId(id: number): void {
    //this.monoService.GetById(id).subscribe({
    //  next: (armazon) => { this.armazon = armazon },
    //  complete: () => { },
    //  error: (err) => {
    //    console.log(err.error);
    //  }
    //})
  }

  onEditar<T>(form: NgForm,item:T): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    //this.service.Editar(item).subscribe({
    //  next: (item) => this.toastr.success('El registro fue actualizado correctamente'),
    //  complete: () => {
    //    this.actualizarTabla();
    //    this.cerrarForm(form);
    //  },
    //  error: (err) => {
    //    this.toastr.error(err.error, 'Error', {
    //      timeOut: 4000,
    //      progressAnimation: 'increasing'
    //    })
    //  }
    //});
  }
}
