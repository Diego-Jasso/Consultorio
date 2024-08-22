import { Component, EventEmitter, Output } from '@angular/core';
import { Estatus } from '../../../compartido/utilerias';
import { IAccesorio } from '../../models/accesorio';
import { AccesorioService } from '../../servicios/accesorio.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accesorio-list',
  templateUrl: './accesorio-list.component.html',
  styleUrl: './accesorio-list.component.css'
})
export class AccesorioListComponent {
  @Output('editar') editar: EventEmitter<number> = new EventEmitter<number>();
  @Output('eliminar') eliminar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('agregar') agregar: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly Estatus = Estatus;

  estado: Estatus = Estatus.Cargando;
  accesorioList: IAccesorio[] = [];
  busquedaTexto = '';

  constructor(private service: AccesorioService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchLista();
  }


  fetchLista(): void {
    this.estado = Estatus.Cargando;
    var observable = this.service.GetAll();
    observable.subscribe({
      next: (_mica: IAccesorio[]) => this.accesorioList = _mica,
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
}
