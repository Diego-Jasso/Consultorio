import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IlenteDeContacto } from '../../models/mica';
import { lenteDeContactoService } from '../../servicios/lente.de.contacto.service';
import { ToastrService } from 'ngx-toastr';
import { validarCamposRequeridos } from '../../../compartido/utilerias';

@Component({
    selector: 'app-lente-de-contacto-form',
    templateUrl: './lente-de-contacto-form.component.html',
    styleUrl: './lente-de-contacto-form.component.css',
    standalone: true
})
export class LenteDeContactoFormComponent {
  @Output('actualizar') actualizar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('addForm') addForm!: NgForm;

  readonly titulo_agregar = "Agregar accesorio";
  readonly titulo_editar = "Editar accesorio";
  mostrarForm: boolean = false;

  lente: IlenteDeContacto = { tipo: 'Tipo' } as IlenteDeContacto;
  isEdit = false;
  constructor(private service: lenteDeContactoService,
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
    this.service.Agregar(this.lente).subscribe({
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
    this.lente = { tipo: 'Tipo' } as IlenteDeContacto;
  }

  cargarDatos(id: number): void {
    this.mostrarForm = true;
    this.isEdit = true;
    this.obtenerPorId(id);
  }

  obtenerPorId(id: number): void {
    this.service.GetById(id).subscribe({
      next: (lente) => { this.lente = lente },
      complete: () => { },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    })
  }

  onEditar(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.service.Editar(this.lente).subscribe({
      next: (lente) => this.toastr.success('El registro fue actualizado correctamente'),
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
