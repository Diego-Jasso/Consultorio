import { Component, EventEmitter, Output } from '@angular/core';
import { Estatus, EstatusList, TipoMica } from '../../../compartido/utilerias';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MicaMonofocalService } from '../../servicios/mica.monofocal.service.';
import { IArmazon } from '../../models/armazon';
import {  micaBifocal, micaMonofocal, micaProgresivo, Mica } from '../../models/mica';
import { MicaBifocalService } from '../../servicios/mica.bifocal.service.';
import { MicaProgresivoService } from '../../servicios/mica.progresivo.service.';
import { MicaService } from '../../servicios/mica.service';

@Component({
  selector: 'app-mica-list',
  templateUrl: './mica-list.component.html',
  styleUrl: './mica-list.component.css'
})
export class MicaListComponent {
  @Output('editar') editar: EventEmitter<number> = new EventEmitter<number>();
  @Output('eliminar') eliminar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('agregar') agregar: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly Estatus = Estatus;
  TipoMica = TipoMica;


  titulo: string = 'Micas';
  estado: Estatus = Estatus.Cargando;
  micaList: Mica[] = [];
  busquedaTexto = '';
  selectedTipo = 'ALL';

  constructor(private monoService: MicaMonofocalService,
    private biService: MicaBifocalService,
    private proService: MicaProgresivoService,
    private tratService: MicaService,
    private toastr: ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit() {
    this.fetchLista(this.selectedTipo);
  }

  fetchLista(tipo?: string): void {
    this.estado = Estatus.Cargando;
    var observable = this.tratService.GetAllWithFilter(tipo);
    observable.subscribe({
      next: (_mica: Mica[]) => this.micaList = _mica,
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

  onEliminar(tratamiento: Mica) {
    this.limpiarFormulario();
    this.tratService.Eliminar(tratamiento.id).subscribe({
      next: (tratamiento) => this.fetchLista(),
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
    this.agregar.emit(true);
  }

  onEditar(mica: Mica) {
    this.editar.emit(mica.id);
  }

  limpiarFormulario() {
    this.eliminar.emit(true);
  }
}
