import { Component, EventEmitter, Output,Input } from '@angular/core';
import { Estatus, EstatusList } from '../../../../compartido/utilerias';
import { IAccesorio } from '../../../models/accesorio';
import { AccesorioService } from '../../../servicios/accesorio.service';
import { ToastrService } from 'ngx-toastr';
import { AccesorioCotizacionModel } from '../../../models/accesorio.cotizacion';
import { MatDialog } from '@angular/material/dialog';
import { AccesorioCotizacionService } from '../../../servicios/accesorio.cotizacion.service';
import { IAccesorioCotizacion } from '../../../models/accesorio.cotizacion';
import { ListDialogComponent } from '../../../shared/list-dialog/list-dialog.component';
import { ModalEliminarComponent } from '../../../shared/modal-eliminar/modal-eliminar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusquedaPipe } from '../../../../compartido/Pipe/busqueda.pipe';

@Component({
    selector: 'app-accesorio-list',
    templateUrl: './accesorio-list.component.html',
    styleUrl: './accesorio-list.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, BusquedaPipe]
})
export class AccesorioListComponent {
  @Input() EstatusLista: EstatusList = EstatusList.Catalogo;
  @Input() CotId: number = 0;
  @Output('editar') editar: EventEmitter<number> = new EventEmitter<number>();
  @Output('eliminar') eliminar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('agregar') agregar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('precioActualizado') precioActualizado: EventEmitter<void> = new EventEmitter<void>();

  readonly TITULO_ELIMINAR = 'Eliminar Accesorio'
  readonly CONFIRMACION_ELIMINAR = '¿Desea eliminar el registro?';
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
    this.fetchLista();
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


  onEliminar(accesorio: IAccesorio) {
    this.limpiarFormulario();
    const dialogRef = this.dialog.open(
      ModalEliminarComponent,
      {
        data: {
          titulo: this.TITULO_ELIMINAR,
          mensaje: this.CONFIRMACION_ELIMINAR
        }
      });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.eliminarPorId(accesorio);
      }
    });
  }

  eliminarPorId(accesorio: IAccesorio) {
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

  

  onEditar(accesorio: IAccesorio) {
    this.editar.emit(accesorio.id);
  }

  limpiarFormulario() {
    this.eliminar.emit(true);
  }

  //onAgregarACotizacion(accesorioId: number, cantidad: string) {

  //  this.cotAccesorio.accesorioid = accesorioId;
  //  this.cotAccesorio.cotizacionid = this.CotId;
  //  this.cotAccesorio.cantidad = parseInt(cantidad, 10);
  //  this.accCotService.Agregar(this.cotAccesorio).subscribe({
  //    next: (accesorio) => this.toastr.success('El registro fue agregado correctamente'),
  //    complete: () => { },
  //    error: (err) => {
  //      this.toastr.error(err.error, 'Error', {
  //        timeOut: 4000,
  //        progressAnimation: 'increasing'
  //      })
  //    }
  //  });
  //}

  //onEliminarDeCotizacion(id: number) {
  //  this.accCotService.Eliminar(id).subscribe({
  //    next: (accesorio) => this.fetchListaCotizacion(this.CotId),
  //    complete: () => {
  //      this.toastr.success('El registro fue eliminado correctamente')
  //    },
  //    error: (err) => {
  //      this.toastr.error(err.error, 'Error', {
  //        timeOut: 4000,
  //        progressAnimation: 'increasing'
  //      })
  //    }
  //  });
  //}
}
