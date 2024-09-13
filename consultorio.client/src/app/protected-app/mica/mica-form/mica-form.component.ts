import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IArmazon } from '../../models/armazon';
import { ArmazonService } from '../../servicios/armazon.service';
import { ToastrService } from 'ngx-toastr';
import { TipoMica, validarCamposRequeridos } from '../../../compartido/utilerias';
import { IlenteDeContacto, micaBifocal, micaMonofocal, micaProgresivo, tratamientosServicios } from '../../models/mica';
import { MicaMonofocalService } from '../../servicios/mica.monofocal.service.';
import { MicaBifocalService } from '../../servicios/mica.bifocal.service.';
import { MicaProgresivoService } from '../../servicios/mica.progresivo.service.';
import { TratamientosServiciosService } from '../../servicios/tratamientos.servicios.service';

@Component({
  selector: 'app-mica-form',
  templateUrl: './mica-form.component.html',
  styleUrl: './mica-form.component.css'
})
export class MicaFormComponent {
  @Output('actualizar') actualizar: EventEmitter<TipoMica> = new EventEmitter<TipoMica>();

  @ViewChild('addForm') addForm!: NgForm;
  TipoMica = TipoMica;


  titulo_agregar = "Agregar ";
  readonly titulo_editar = "Editar";
  mostrarForm: boolean = false;


  TipoMicaForm: TipoMica = TipoMica.Monofocal;
  micaObject: object = {} as object;
  monofocal: micaMonofocal = { tipo: 'Tipo' } as micaMonofocal;
  progresivo: micaProgresivo = {} as micaProgresivo;
  bifocal: micaBifocal = {} as micaBifocal;
  tratamiento: tratamientosServicios = {} as tratamientosServicios;
  isEdit = false;
  constructor(private monoService: MicaMonofocalService,
    private biService: MicaBifocalService,
    private proService: MicaProgresivoService,
    private tratService:TratamientosServiciosService,
    private toastr: ToastrService) { }

  cerrarForm(form: NgForm) {
    this.limpiar(form);
    this.mostrarForm = false;
  }

  abrirForm(mica: TipoMica) {
    this.TipoMicaForm = mica;
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
        if (this.isEdit) {
          this.onEditarMono(form);
        } else {
          this.onAgregarMono(form);
        }
        break;
      case TipoMica.Progresivo:
        if (this.isEdit) {
          this.onEditarPro(form);
        } else {
          this.onAgregarPro(form);
        }
        break;
      case TipoMica.Bifocal:
        if (this.isEdit) {
          this.onEditarBi(form);
        } else {
          this.onAgregarBi(form);
        }
        break;
      case TipoMica.Tratamiento:
        if (this.isEdit) {
          this.onEditarTrat(form);
        } else {
          this.onAgregarTrat(form);
        }
        break;
      default:
        if (this.isEdit) {
          this.onEditarMono(form);
        } else {
          this.onAgregarMono(form);
        }
        break;
    }
  }

  onAgregarMono(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.monoService.Agregar(this.monofocal).subscribe({
      next: () => this.toastr.success('El registro fue agregado correctamente'),
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

  onAgregarBi(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.biService.Agregar(this.bifocal).subscribe({
      next: () => this.toastr.success('El registro fue agregado correctamente'),
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

  onAgregarPro(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.proService.Agregar(this.progresivo).subscribe({
      next: () => this.toastr.success('El registro fue agregado correctamente'),
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

  onAgregarTrat(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.tratService.Agregar(this.tratamiento).subscribe({
      next: () => this.toastr.success('El registro fue agregado correctamente'),
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
    this.actualizar.emit(this.TipoMicaForm);
  }

  limpiar(form: NgForm): void {
    form.reset();
    this.isEdit = false;
    this.monofocal = { tipo: 'Tipo' } as micaMonofocal;
  }

  cargarDatos(id: number): void {
    this.mostrarForm = true;
    this.isEdit = true;
    switch (this.TipoMicaForm) {
      case TipoMica.Monofocal:
        this.obtenerPorIdMono(id);
        break;
      case TipoMica.Progresivo:
        this.obtenerPorIdPro(id);
        break;
      case TipoMica.Bifocal:
        this.obtenerPorIdBi(id);
        break;
      case TipoMica.Tratamiento:
        this.obtenerPorIdTrat(id);
        break;
      default:
          this.obtenerPorIdMono(id);
        break;
    }
    
  }

  obtenerPorIdMono(id: number): void {
    this.monoService.GetById(id).subscribe({
      next: (mono) => { this.monofocal = mono },
      complete: () => { },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    })
  }

  obtenerPorIdBi(id: number): void {
    this.biService.GetById(id).subscribe({
      next: (mono) => { this.bifocal = mono },
      complete: () => { },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    })
  }

  obtenerPorIdPro(id: number): void {
    this.proService.GetById(id).subscribe({
      next: (mono) => { this.progresivo = mono },
      complete: () => { },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    })
  }

  obtenerPorIdTrat(id: number): void {
    this.tratService.GetById(id).subscribe({
      next: (mono) => { this.tratamiento = mono },
      complete: () => { },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    })
  }

  onEditarMono(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.monoService.Editar(this.monofocal).subscribe({
      next: (item) => this.toastr.success('El registro fue actualizado correctamente'),
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

  onEditarBi(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.biService.Editar(this.bifocal).subscribe({
      next: (item) => this.toastr.success('El registro fue actualizado correctamente'),
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

  onEditarPro(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.proService.Editar(this.progresivo).subscribe({
      next: (item) => this.toastr.success('El registro fue actualizado correctamente'),
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

  onEditarTrat(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.tratService.Editar(this.tratamiento).subscribe({
      next: (item) => this.toastr.success('El registro fue actualizado correctamente'),
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
