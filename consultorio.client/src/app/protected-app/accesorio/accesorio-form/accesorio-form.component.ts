import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAccesorio } from '../../models/accesorio';
import { AccesorioService } from '../../servicios/accesorio.service';
import { ToastrService } from 'ngx-toastr';
import { validarCamposRequeridos } from '../../../compartido/utilerias';

@Component({
    selector: 'app-accesorio-form',
    templateUrl: './accesorio-form.component.html',
    styleUrl: './accesorio-form.component.css',
    standalone: true
})
export class AccesorioFormComponent {
  @Output('actualizar') actualizar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('addForm') addForm!: NgForm;

  readonly titulo_agregar = "Agregar accesorio";
  readonly titulo_editar = "Editar accesorio";
  mostrarForm: boolean = false;

  accesorio: IAccesorio = {} as IAccesorio;
  isEdit = false;
  constructor(private service: AccesorioService,
    private toastr: ToastrService) { }

  cerrarForm(form: NgForm) {
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
    this.service.Agregar(this.accesorio).subscribe({
      next: (mica) => this.toastr.success('El registro fue agregado correctamente'),
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
    this.accesorio = {} as IAccesorio;
  }

  cargarDatos(id: number): void {
    this.mostrarForm = true;
    this.isEdit = true;
    this.obtenerPorId(id);
  }

  obtenerPorId(id: number): void {
    this.service.GetById(id).subscribe({
      next: (accesorio) => { this.accesorio = accesorio },
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
    this.service.Editar(this.accesorio).subscribe({
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
