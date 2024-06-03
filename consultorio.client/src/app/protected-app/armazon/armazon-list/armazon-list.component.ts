import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArmazon } from '../../models/armazon';
import { ArmazonService } from '../../servicios/armazon.service';
import { ToastrService } from 'ngx-toastr';
import { Estatus } from '../../../compartido/utilerias';


@Component({
  selector: 'app-armazon-list',
  templateUrl: './armazon-list.component.html',
  styleUrl: './armazon-list.component.css'
})
export class ArmazonListComponent {
  @Input() isCotizacionList = false;
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

  constructor(private service: ArmazonService,
    private toastr: ToastrService) { }

  ngOnInit() {
    if (this.isCotizacionList){
      this.fetchListaCotizacion();
    } else {

      this.fetchLista();
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
    console.log("Cotizacion");
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
    console.log("Agregar a cotizacion");
  }

  onEditar(armazon: IArmazon) {
    this.editar.emit(armazon.armazonid);
  }

  limpiarFormulario() {
    this.eliminar.emit(true);
  }
}
