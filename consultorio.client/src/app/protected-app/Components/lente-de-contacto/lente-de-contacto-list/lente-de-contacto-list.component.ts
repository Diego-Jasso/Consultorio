import { Component, EventEmitter, Output } from '@angular/core';
import { Estatus } from '../../../../compartido/utilerias';
import { IlenteDeContacto } from '../../../models/mica';
import { lenteDeContactoService } from '../../../servicios/lente.de.contacto.service';
import { ToastrService } from 'ngx-toastr';
import { ModalEliminarComponent } from '../../../shared/modal-eliminar/modal-eliminar.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { BusquedaPipe } from '../../../../compartido/Pipe/busqueda.pipe';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-lente-de-contacto-list',
    templateUrl: './lente-de-contacto-list.component.html',
    styleUrl: './lente-de-contacto-list.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, BusquedaPipe]
})
export class LenteDeContactoListComponent {
  @Output('editar') editar: EventEmitter<number> = new EventEmitter<number>();
  @Output('eliminar') eliminar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('agregar') agregar: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly TITULO_ELIMINAR = 'Eliminar Lente de Contacto'
  readonly CONFIRMACION_ELIMINAR = '¿Desea eliminar el registro?';
  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly Estatus = Estatus;

  estado: Estatus = Estatus.Cargando;
  lenteDeContactoList: IlenteDeContacto[] = [];
  busquedaTexto = '';

  constructor(private service: lenteDeContactoService,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchLista();
  }


  fetchLista(): void {
    this.estado = Estatus.Cargando;
    var observable = this.service.GetAll();
    observable.subscribe({
      next: (_lente: IlenteDeContacto[]) => this.lenteDeContactoList = _lente,
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
    if (this.lenteDeContactoList = []) {
      this.estado = Estatus.Vacio;
    }
  }

  onEliminar(lente: IlenteDeContacto) {
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
        this.eliminarPorId(lente);
      }
    });
  }

  eliminarPorId(lente: IlenteDeContacto) {
    this.service.Eliminar(lente.id).subscribe({
      next: (lente) => this.fetchLista(),
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

  onEditar(lente: IlenteDeContacto) {
    this.editar.emit(lente.id);
  }

  limpiarFormulario() {
    this.eliminar.emit(true);
  }
}
