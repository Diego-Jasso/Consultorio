import { Component, EventEmitter, Output } from '@angular/core';
import { Estatus, EstatusList, TipoMica } from '../../../compartido/utilerias';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MicaMonofocalService } from '../../servicios/mica.monofocal.service.';
import { IArmazon } from '../../models/armazon';
import {  micaBifocal, micaMonofocal, micaProgresivo, tratamientosServicios } from '../../models/mica';
import { MicaBifocalService } from '../../servicios/mica.bifocal.service.';
import { MicaProgresivoService } from '../../servicios/mica.progresivo.service.';
import { TratamientosServiciosService } from '../../servicios/tratamientos.servicios.service';

@Component({
  selector: 'app-mica-list',
  templateUrl: './mica-list.component.html',
  styleUrl: './mica-list.component.css'
})
export class MicaListComponent {
  @Output('editar') editar: EventEmitter<number> = new EventEmitter<number>();
  @Output('eliminar') eliminar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('agregar') agregar: EventEmitter<TipoMica> = new EventEmitter<TipoMica>();
  @Output('cambioForm') cambioForm: EventEmitter<TipoMica> = new EventEmitter<TipoMica>();

  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly Estatus = Estatus;
  TipoMica = TipoMica;


  titulo: string = 'Micas Monofocales/Vision Sencilla';
  estado: Estatus = Estatus.Cargando;
  monofocalList: micaMonofocal[] = [];
  progresivoList: micaProgresivo[] = [];
  bifocalList: micaBifocal[] = [];
  tratamientoList: tratamientosServicios[] = [];
  busquedaTexto = '';
  TipoMicaList: TipoMica = TipoMica.Monofocal;

  constructor(private monoService: MicaMonofocalService,
    private biService: MicaBifocalService,
    private proService: MicaProgresivoService,
    private tratService: TratamientosServiciosService,
    private toastr: ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit() {
    this.fetchListaMono();
  }

  fetchListaMono(): void {
    this.estado = Estatus.Cargando;
    var observable = this.monoService.GetAll();
    observable.subscribe({
      next: (_mica: micaMonofocal[]) => this.monofocalList= _mica,
      complete: () => this.estado = Estatus.Procesado,
      error: (err) => {
        this.estado = Estatus.Error;
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        });
      }
    });
  }
  fetchListaBi(): void {
    this.estado = Estatus.Cargando;
    var observable = this.biService.GetAll();
    observable.subscribe({
      next: (_mica: micaBifocal[]) => this.bifocalList = _mica,
      complete: () => this.estado = Estatus.Procesado,
      error: (err) => {
        this.estado = Estatus.Error;
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  fetchListaProgre(): void {
    this.estado = Estatus.Cargando;
    var observable = this.proService.GetAll();
    observable.subscribe({
      next: (_mica: micaProgresivo[]) => this.progresivoList = _mica,
      complete: () => this.estado = Estatus.Procesado,
      error: (err) => {
        this.estado = Estatus.Error;
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  fetchListaTrat(): void {
    this.estado = Estatus.Cargando;
    var observable = this.tratService.GetAll();
    observable.subscribe({
      next: (_tratamiento: tratamientosServicios[]) => this.tratamientoList = _tratamiento,
      complete: () => this.estado = Estatus.Procesado,
      error: (err) => {
        this.estado = Estatus.Error;
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  onEliminarMono(mica: micaMonofocal) {
    this.limpiarFormulario();
    this.monoService.Eliminar(mica.id).subscribe({
      next: (mica) => this.fetchListaMono(),
      complete: () => {
        this.toastr.success('El registro fue eliminado correctamente')
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }

  onEliminarBi(mica: micaBifocal) {
    this.limpiarFormulario();
    this.biService.Eliminar(mica.id).subscribe({
      next: (mica) => this.fetchListaBi(),
      complete: () => {
        this.toastr.success('El registro fue eliminado correctamente')
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }

  onEliminarProgre(mica: micaProgresivo) {
    this.limpiarFormulario();
    this.proService.Eliminar(mica.id).subscribe({
      next: (mica) => this.fetchListaProgre(),
      complete: () => {
        this.toastr.success('El registro fue eliminado correctamente')
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }

  onEliminarTrat(tratamiento: tratamientosServicios) {
    this.limpiarFormulario();
    this.tratService.Eliminar(tratamiento.id).subscribe({
      next: (tratamiento) => this.fetchListaTrat(),
      complete: () => {
        this.toastr.success('El registro fue eliminado correctamente')
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }

  onAgregar(): void {
    this.agregar.emit(this.TipoMicaList);
  }

  onEditar(armazon: IArmazon) {
    this.editar.emit(armazon.armazonid);
  }

  limpiarFormulario() {
    this.eliminar.emit(true);
  }

  onTabClick(e:any) {
    const tabIndex = e.index;
    switch (tabIndex) {
      case 0:
        this.TipoMicaList = TipoMica.Monofocal;
        this.titulo = 'Micas Monofocales/Vision Sencilla';
        this.fetchListaMono();
        break;
      case 1:
        this.TipoMicaList = TipoMica.Progresivo;
        this.titulo = 'Micas Progresivos';
        this.fetchListaProgre();
        break;
      case 2:
        this.TipoMicaList = TipoMica.Bifocal;
        this.titulo = 'Micas Bifocales';
        this.fetchListaBi();
        break;
      case 3:
        this.TipoMicaList = TipoMica.Tratamiento;
        this.titulo = 'Tratamientos y Servicios';
        this.fetchListaTrat();
        break;
      default:
        this.TipoMicaList = TipoMica.Monofocal;
        this.titulo = 'Micas Monofocales/Vision Sencilla';
        this.fetchListaMono();
    }
    this.cambioForm.emit(this.TipoMicaList);
  }
}
