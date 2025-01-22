import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArmazonService } from '../../servicios/armazon.service';
import { IArmazon } from '../../models/armazon';
import { NgForm } from '@angular/forms';
import { validarCamposRequeridos } from '../../../compartido/utilerias';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-armazon-form',
    templateUrl: './armazon-form.component.html',
    styleUrl: './armazon-form.component.css',
    standalone: true
})
export class ArmazonFormComponent {

  @Output('actualizar') actualizar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('addForm') addForm!: NgForm;

  readonly titulo_agregar = "Agregar armazon";
  readonly titulo_editar = "Editar armazon";
  mostrarForm: boolean = false;

  armazon: IArmazon = {} as IArmazon;
  isEdit = false;
  constructor(private service: ArmazonService,
    private toastr: ToastrService) { }

  cerrarForm(form:NgForm) {
    this.limpiar(form);
    this.mostrarForm = false;
  }

  abrirForm() {
    this.mostrarForm = true;
  }

  onGuardar(form: NgForm): void {
    if (this.isEdit) {
      this.onEditar(form);
    } else {
      this.onAgregar(form);
    }
  }

  onAgregar(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.service.Agregar(this.armazon).subscribe({
      next: (armazon) => this.toastr.success('El registro fue agregado correctamente'),
      complete: () => {
        this.actualizarTabla();
        this.limpiar(form);
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }

  actualizarTabla() {
    this.actualizar.emit(true);
  }

  limpiar(form: NgForm): void {
    form.reset();
    this.isEdit = false;
    this.armazon = {} as IArmazon;
  }

  cargarDatos(id: number): void {
    this.mostrarForm = true;
    this.isEdit = true;
    this.obtenerPorId(id);
  }

  obtenerPorId(id: number): void {
    this.service.GetById(id).subscribe({
      next: (armazon) => { this.armazon = armazon },
      complete: () => { },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

  onEditar(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.service.Editar(this.armazon).subscribe({
      next: (tipoAcceso) => this.toastr.success('El registro fue actualizado correctamente'),
      complete: () => {
        this.actualizarTabla();
        this.cerrarForm(form);
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }
}
