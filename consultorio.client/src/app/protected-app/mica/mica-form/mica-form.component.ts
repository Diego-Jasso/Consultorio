import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IArmazon } from '../../models/armazon';
import { ArmazonService } from '../../servicios/armazon.service';
import { ToastrService } from 'ngx-toastr';
import { TipoMica, validarCamposRequeridos } from '../../../compartido/utilerias';
import { IlenteDeContacto, micaBifocal, micaMonofocal, micaProgresivo, Mica } from '../../models/mica';
import { MicaMonofocalService } from '../../servicios/mica.monofocal.service.';
import { MicaBifocalService } from '../../servicios/mica.bifocal.service.';
import { MicaProgresivoService } from '../../servicios/mica.progresivo.service.';
import { MicaService } from '../../servicios/mica.service';

@Component({
    selector: 'app-mica-form',
    templateUrl: './mica-form.component.html',
    styleUrl: './mica-form.component.css',
    standalone: true
})
export class MicaFormComponent {
  @Output('actualizar') actualizar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('addForm') addForm!: NgForm;


  readonly titulo_agregar = "Agregar";
  readonly titulo_editar = "Editar";
  mostrarForm: boolean = false;


  micaObject: object = {} as object;
  monofocal: micaMonofocal = { tipo: 'Tipo' } as micaMonofocal;
  progresivo: micaProgresivo = {} as micaProgresivo;
  bifocal: micaBifocal = {} as micaBifocal;
  mica: Mica = {} as Mica;
  isEdit = false;
  constructor(private monoService: MicaMonofocalService,
    private biService: MicaBifocalService,
    private proService: MicaProgresivoService,
    private tratService:MicaService,
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
    this.tratService.Agregar(this.mica).subscribe({
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
    this.actualizar.emit(true);
  }

  limpiar(form: NgForm): void {
    form.reset();
    this.isEdit = false;
    this.monofocal = { tipo: 'Tipo' } as micaMonofocal;
  }

  cargarDatos(id: number): void {
    this.mostrarForm = true;
    this.isEdit = true;
        this.obtenerPorId(id);
  }


  obtenerPorId(id: number): void {
    this.tratService.GetById(id).subscribe({
      next: (mono) => { this.mica = mono },
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
    this.tratService.Editar(this.mica).subscribe({
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
