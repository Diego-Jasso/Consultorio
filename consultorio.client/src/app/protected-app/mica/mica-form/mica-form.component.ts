import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IArmazon } from '../../models/armazon';
import { ArmazonService } from '../../servicios/armazon.service';
import { ToastrService } from 'ngx-toastr';
import { TipoMica, validarCamposRequeridos } from '../../../compartido/utilerias';
import { IlenteDeContacto, micaBifocal, micaMonofocal, micaProgresivo, tratamientosServicios } from '../../models/mica';

@Component({
  selector: 'app-mica-form',
  templateUrl: './mica-form.component.html',
  styleUrl: './mica-form.component.css'
})
export class MicaFormComponent {
  @Output('actualizar') actualizar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('addForm') addForm!: NgForm;
  TipoMica = TipoMica;

  titulo: string = 'Micas Monofocales/Vision Sencilla';

  readonly titulo_agregar = "Agregar " + this.titulo;
  readonly titulo_editar = "Editar";
  mostrarForm: boolean = false;


  TipoMicaForm: TipoMica = TipoMica.LenteDeContacto;
  micaObject: object = {} as object;
  lenteDeContacto: IlenteDeContacto = {} as IlenteDeContacto;
  monofocal: micaMonofocal = {} as micaMonofocal;
  progresivo: micaProgresivo = {} as micaProgresivo;
  bifocal: micaBifocal = {} as micaBifocal;
  tratamiento: tratamientosServicios = {} as tratamientosServicios;
  isEdit = false;
  constructor(private service: ArmazonService,
    private toastr: ToastrService) { }

  cerrarForm(form: NgForm) {
    this.limpiar(form);
    this.mostrarForm = false;
  }

  abrirForm(mica: TipoMica) {
    this.TipoMicaForm = mica;
    this.mostrarForm = true;
  }

  onGuardar(form: NgForm): void {
    if (this.isEdit) {
      this.onEditar(form,this.micaObject);
    } else {
      this.onAgregar(form,this.micaObject);
    }
  }

  onAgregar<T>(form: NgForm,item: T): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    console.log(item);
    //this.service.Agregar(item).subscribe({
    //  next: (item) => this.toastr.success('El registro fue agregado correctamente'),
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
    console.log(id);
    //this.service.GetById(id).subscribe({
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
    console.log(item);
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
