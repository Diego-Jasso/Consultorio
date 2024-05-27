import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Imica } from '../../models/mica';
import { MicaService } from '../../servicios/mica.service';
import { ToastrService } from 'ngx-toastr';
import { validarCamposRequeridos } from '../../../compartido/utilerias';

@Component({
  selector: 'app-mica-form',
  templateUrl: './mica-form.component.html',
  styleUrl: './mica-form.component.css'
})
export class MicaFormComponent {
  @Output('actualizar') actualizar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('addForm') addForm!: NgForm;

  readonly titulo_agregar = "Agregar mica";
  readonly titulo_editar = "Editar mica";
  mostrarForm: boolean = false;

  mica: Imica = {} as Imica;
  isEdit = false;
  constructor(private service: MicaService,
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
    this.service.Agregar(this.mica).subscribe({
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
    this.mica = {} as Imica;
  }

  cargarDatos(id: number): void {
    this.mostrarForm = true;
    this.isEdit = true;
    this.obtenerPorId(id);
  }

  obtenerPorId(id: number): void {
    this.service.GetById(id).subscribe({
      next: (mica) => { this.mica = mica },
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
    this.service.Editar(this.mica).subscribe({
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
