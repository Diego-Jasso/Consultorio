import { Component, EventEmitter, Output } from '@angular/core';
import { Estatus, EstatusList, TipoMica } from '../../../compartido/utilerias';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MicaService } from '../../servicios/mica.service.';
import { IArmazon } from '../../models/armazon';
import { IlenteDeContacto, micaBifocal, micaMonofocal, micaProgresivo, tratamientosServicios } from '../../models/mica';

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
  lenteDeContactoList: IlenteDeContacto[] = [];
  monofocalList: micaMonofocal[] = [];
  progresivoList: micaProgresivo[] = [];
  bifocalList: micaBifocal[] = [];
  tratamientoList: tratamientosServicios[] = [];
  busquedaTexto = '';
  TipoMicaList: TipoMica = TipoMica.Monofocal;

  constructor(private service: MicaService,
    private toastr: ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit() {

  }

  fetchLista(): void {
    //this.estado = Estatus.Cargando;
    //var observable = this.service.GetAll();
    //observable.subscribe({
    //  next: (_armazon: IArmazon[]) => this.micaList = _armazon,
    //  complete: () => this.estado = Estatus.Procesado,
    //  error: (err) => {
    //    this.estado = Estatus.Error;
    //    this.toastr.error(err.error, 'Error', {
    //      timeOut: 4000,
    //      progressAnimation: 'increasing'
    //    });
    //  }
    //});
  }

  onEliminar(armazon: IArmazon) {
    //this.limpiarFormulario();
    //this.service.Eliminar(armazon.armazonid).subscribe({
    //  next: (armazon) => this.fetchLista(),
    //  complete: () => {
    //    this.toastr.success('El registro fue eliminado correctamente')
    //  },
    //  error: (err) => {
    //    this.toastr.error(err.error, 'Error', {
    //      timeOut: 4000,
    //      progressAnimation: 'increasing'
    //    })
    //  }
    //});
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
        break;
      case 1:
        this.TipoMicaList = TipoMica.Progresivo;
        this.titulo = 'Micas Progresivos';
        break;
      case 2:
        this.TipoMicaList = TipoMica.Bifocal;
        this.titulo = 'Micas Bifocales';
        break;
      case 3:
        this.TipoMicaList = TipoMica.LenteDeContacto;
        this.titulo = 'Lentes de Contacto';
        break;
      case 4:
        this.TipoMicaList = TipoMica.Tratamiento;
        this.titulo = 'Tratamientos y Servicios';
        break;
      default:
        this.TipoMicaList = TipoMica.Monofocal;
        this.titulo = 'Micas Monofocales/Vision Sencilla';
    }
    this.cambioForm.emit(this.TipoMicaList);
  }
}
