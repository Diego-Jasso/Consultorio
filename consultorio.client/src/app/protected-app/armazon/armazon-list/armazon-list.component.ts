import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArmazon } from '../../models/armazon';
import { ArmazonService } from '../../servicios/armazon.service';
import { ToastrService } from 'ngx-toastr';
import { Estatus, EstatusList } from '../../../compartido/utilerias';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogComponent } from '../../shared/list-dialog/list-dialog.component';
import { ArmazonCotizacionService } from '../../servicios/armazon.cotizacion.service';


@Component({
  selector: 'app-armazon-list',
  templateUrl: './armazon-list.component.html',
  styleUrl: './armazon-list.component.css'
})
export class ArmazonListComponent {
  @Input() EstatusLista:EstatusList = EstatusList.Catalogo;
  @Output('editar') editar: EventEmitter<number> = new EventEmitter<number>();
  @Output('eliminar') eliminar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('agregar') agregar: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly Estatus = Estatus;

  estado: Estatus = Estatus.Cargando;
  armazonList: IArmazon[] = [];
  busquedaTexto = '';
  EstatusList = EstatusList;

  constructor(private service: ArmazonService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private artservice: ArmazonCotizacionService) { }

  ngOnInit() {
    switch (this.EstatusLista) {
      case EstatusList.Catalogo:
        this.fetchLista();
        break;
      case EstatusList.Cotizacion:
        this.fetchListaCotizacion();
        break
      case EstatusList.BusquedaCotizacion:
        this.fetchLista();
        break;
    }
  }

  fetchLista(): void {
    this.estado = Estatus.Cargando;
    var observable = this.service.GetAll();
    observable.subscribe({
      next: (_armazon: IArmazon[]) => this.armazonList = _armazon,
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

  fetchListaCotizacion(): void {
    this.estado = Estatus.Cargando;
    var observable = this.artservice.GetAll();
    observable.subscribe({
      next: (_armazon: IArmazon[]) => this.armazonList = _armazon,
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

  onEliminar(armazon: IArmazon) {
    this.limpiarFormulario();
    this.service.Eliminar(armazon.armazonid).subscribe({
      next: (armazon) => this.fetchLista(),
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

  onAgregarACotizacion(): void {
    const dialogRef = this.dialog.open(
      ListDialogComponent,
      {
        data: {
          Lista: "Armazon"
        }
      });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.fetchListaCotizacion();
      }
    });
    console.log("Agregar a cotizacion");
  }

  onEditar(armazon: IArmazon) {
    this.editar.emit(armazon.armazonid);
  }

  limpiarFormulario() {
    this.eliminar.emit(true);
  }
}
