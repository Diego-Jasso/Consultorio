import { Component, EventEmitter, Output } from '@angular/core';
import { Estatus } from '../../../compartido/utilerias';
import { Imica } from '../../models/mica';
import { MicaService } from '../../servicios/mica.service';
import { ToastrService } from 'ngx-toastr';

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

  estado: Estatus = Estatus.Cargando;
  micaList: Imica[] = [];
  busquedaTexto = '';

  constructor(private service: MicaService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchLista();
  }


  fetchLista(): void {
    this.estado = Estatus.Cargando;
    var observable = this.service.GetAll();
    observable.subscribe({
      next: (_mica: Imica[]) => this.micaList = _mica,
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
    if (this.micaList = []) {
      this.estado = Estatus.Vacio;
    }
  }

  onEliminar(mica: Imica) {
    this.limpiarFormulario();
    this.service.Eliminar(mica.micaid).subscribe({
      next: (mica) => this.fetchLista(),
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

  onEditar(mica: Imica) {
    this.editar.emit(mica.micaid);
  }

  limpiarFormulario() {
    this.eliminar.emit(true);
  }
}
