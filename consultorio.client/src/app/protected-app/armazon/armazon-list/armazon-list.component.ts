import { Component, EventEmitter, Output } from '@angular/core';
import { Estatus, IArmazon } from '../../models/armazon';
import { ArmazonService } from '../../servicios/armazon.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-armazon-list',
  templateUrl: './armazon-list.component.html',
  styleUrl: './armazon-list.component.css'
})
export class ArmazonListComponent {

  @Output('editar') editar: EventEmitter<number> = new EventEmitter<number>();
  @Output('eliminar') eliminar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('agregar') agregar: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly Estatus = Estatus;

  estado: Estatus = Estatus.Cargando;
  armazonList: IArmazon[] = [];

  constructor(private service: ArmazonService,
    private toastr: ToastrService) { }

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

  onEditar(armazon: IArmazon) {
    this.editar.emit(armazon.armazonid);
  }

  limpiarFormulario() {
    this.eliminar.emit(true);
  }
}
