import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArmazon } from '../../../models/armazon';
import { ArmazonService } from '../../../servicios/armazon.service';
import { ToastrService } from 'ngx-toastr';
import { Estatus, EstatusList } from '../../../../compartido/utilerias';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogComponent } from '../../../shared/list-dialog/list-dialog.component';
import { ArticuloCotizacionService } from '../../../servicios/armazon.cotizacion.service';
import { SharedService } from '../../../servicios/shared.service';
import { IArticuloCotizacion,ArticuloCotizacionModel } from '../../../models/armazon.cotizacion';
import { ModalEliminarComponent } from '../../../shared/modal-eliminar/modal-eliminar.component';
import { CommonModule } from '@angular/common';
import { ArmazonFormComponent } from '../armazon-form/armazon-form.component';
import { BusquedaPipe } from '../../../../compartido/Pipe/busqueda.pipe';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-armazon-list',
    templateUrl: './armazon-list.component.html',
    styleUrl: './armazon-list.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, BusquedaPipe]
})
export class ArmazonListComponent {
  @Input() EstatusLista: EstatusList = EstatusList.Catalogo;
  @Input() CotId: number = 0;
  @Output('editar') editar: EventEmitter<number> = new EventEmitter<number>();
  @Output('eliminar') eliminar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('agregar') agregar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('precioActualizado') precioActualizado: EventEmitter<void> = new EventEmitter<void>();

  readonly TITULO_ELIMINAR = 'Eliminar Armazon'
  readonly CONFIRMACION_ELIMINAR = '¿Desea eliminar el registro?';
  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly Estatus = Estatus;

  estado: Estatus = Estatus.Cargando;
  armazonList: IArmazon[] = [];
  ArticuloCotizacionList: IArticuloCotizacion[] = [];
  busquedaTexto = '';
  EstatusList = EstatusList;
  cotArmazon: ArticuloCotizacionModel = {} as ArticuloCotizacionModel;

  constructor(private service: ArmazonService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private artservice: ArticuloCotizacionService,
    private sharedService: SharedService){ }

  ngOnInit() {
    this.fetchLista();
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

  //fetchListaCotizacion(id:number): void {
  //  this.estado = Estatus.Cargando;
  //  var observable = this.artservice.GetAll(id);
  //  observable.subscribe({
  //    next: (_armazon: IArticuloCotizacion[]) => this.ArticuloCotizacionList = _armazon,
  //    complete: () => this.estado = Estatus.Procesado,
  //    error: (err) => {
  //      this.estado = Estatus.Error;
  //      this.toastr.error(err.error, 'Error', {
  //        timeOut: 4000,
  //        progressAnimation: 'increasing'
  //      });
  //    }
  //  });
  //}

  onEliminar(armazon: IArmazon) {
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
        this.eliminarPorId(armazon);
      }
    });
  }

  eliminarPorId(armazon:IArmazon) {
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

  //onAbrirArmazones(): void {
  //  const dialogRef = this.dialog.open(
  //    ListDialogComponent,
  //    {
  //      data: {
  //        Lista: "Armazon",
  //        Id:this.CotId
  //      }
  //    });
  //  dialogRef.afterClosed().subscribe(respuesta => {
  //    if (respuesta) {
  //      this.fetchListaCotizacion(this.CotId);
  //      this.precioActualizado.emit(); 
  //    }
  //  });
  //}

  onEditar(armazon: IArmazon) {
    this.editar.emit(armazon.armazonid);
  }

  limpiarFormulario() {
    this.eliminar.emit(true);
  }

  onAgregarACotizacion(armazonId: number, cantidad: string) {

    this.cotArmazon.armazonid = armazonId;
    this.cotArmazon.cotizacionid = this.CotId;
    this.cotArmazon.cantidad = parseInt(cantidad, 10);
    this.artservice.Agregar(this.cotArmazon).subscribe({
      next: (armazon) => this.toastr.success('El registro fue agregado correctamente'),
      complete: () => {},
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }

  //onEliminarDeCotizacion(id: number) {
  //  this.artservice.Eliminar(id).subscribe({
  //    next: (armazon) => this.fetchListaCotizacion(this.CotId),
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
