import { Component, EventEmitter, Output,Input } from '@angular/core';
import { Estatus, EstatusList } from '../../../compartido/utilerias';
import { IAccesorio } from '../../models/accesorio';
import { AccesorioService } from '../../servicios/accesorio.service';
import { ToastrService } from 'ngx-toastr';
import { AccesorioCotizacionModel } from '../../models/accesorio.cotizacion';
import { MatDialog } from '@angular/material/dialog';
import { AccesorioCotizacionService } from '../../servicios/accesorio.cotizacion.service';
import { IAccesorioCotizacion } from '../../models/accesorio.cotizacion';
import { ListDialogComponent } from '../../shared/list-dialog/list-dialog.component';

@Component({
  selector: 'app-accesorio-list',
  templateUrl: './accesorio-list.component.html',
  styleUrl: './accesorio-list.component.css'
})
export class AccesorioListComponent {
  @Input() EstatusLista: EstatusList = EstatusList.Catalogo;
  @Input() CotId: number = 0;
  @Output('editar') editar: EventEmitter<number> = new EventEmitter<number>();
  @Output('eliminar') eliminar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('agregar') agregar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('precioActualizado') precioActualizado: EventEmitter<void> = new EventEmitter<void>();

  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly Estatus = Estatus;

  estado: Estatus = Estatus.Cargando;
  accesorioList: IAccesorio[] = [];
  accesorioCotizacionList: IAccesorioCotizacion[] = [];
  busquedaTexto = '';
  EstatusList = EstatusList;
  cotAccesorio: AccesorioCotizacionModel = {} as AccesorioCotizacionModel;

  constructor(private service: AccesorioService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private accCotService: AccesorioCotizacionService) { }

  ngOnInit() {
    switch (this.EstatusLista) {
      case EstatusList.Catalogo:
        this.fetchLista();
        break;
      case EstatusList.Cotizacion:

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
      next: (_accesorio: IAccesorio[]) => this.accesorioList = _accesorio,
      complete: () => 
          this.estado = Estatus.Procesado,
      error: (err) => {
        this.estado = Estatus.Error;
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        });
      }
    });
    if (this.accesorioList = []) {
      this.estado = Estatus.Vacio;
    }
  }

  fetchListaCotizacion(id: number): void {
    this.estado = Estatus.Cargando;
    var observable = this.accCotService.GetAll(id);
    observable.subscribe({
      next: (_accesorio: IAccesorioCotizacion[]) => this.accesorioCotizacionList = _accesorio,
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

  onEliminar(accesorio: IAccesorio) {
    this.limpiarFormulario();
    this.service.Eliminar(accesorio.id).subscribe({
      next: (accesorio) => this.fetchLista(),
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

  onAbrirAccesorios(): void {
    const dialogRef = this.dialog.open(
      ListDialogComponent,
      {
        data: {
          Lista: "Accesorio",
          Id: this.CotId
        }
      });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.fetchListaCotizacion(this.CotId);
        this.precioActualizado.emit();
      }
    });
  }

  onEditar(accesorio: IAccesorio) {
    this.editar.emit(accesorio.id);
  }

  limpiarFormulario() {
    this.eliminar.emit(true);
  }

  onAgregarACotizacion(accesorioId: number, cantidad: string) {

    this.cotAccesorio.accesorioid = accesorioId;
    this.cotAccesorio.cotizacionid = this.CotId;
    this.cotAccesorio.cantidad = parseInt(cantidad, 10);
    this.accCotService.Agregar(this.cotAccesorio).subscribe({
      next: (accesorio) => this.toastr.success('El registro fue agregado correctamente'),
      complete: () => { },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }

  onEliminarDeCotizacion(id: number) {
    this.accCotService.Eliminar(id).subscribe({
      next: (accesorio) => this.fetchListaCotizacion(this.CotId),
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
}
