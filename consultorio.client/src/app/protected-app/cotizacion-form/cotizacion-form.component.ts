import { Component, EventEmitter, Input, Output, ViewChild,  } from '@angular/core';
import { ICotizacion } from '../models/cotizacion';
import { Estatus, EstatusList, validarCamposRequeridos } from '../../compartido/utilerias';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CotizacionService } from '../servicios/cotizacion.service';
import { AuthService } from '../../auth/services/auth.service';
import { formatDate } from '@angular/common';
import { SharedService } from '../servicios/shared.service';
import { ArmazonListComponent } from '../armazon/armazon-list/armazon-list.component';
import { AccesorioListComponent } from '../accesorio/accesorio-list/accesorio-list.component';
import { ArticuloCotizacionModel, IArticuloCotizacion } from '../models/armazon.cotizacion';
import { ArticuloCotizacionService } from '../servicios/armazon.cotizacion.service';

@Component({
    selector: 'app-cotizacion-form',
    templateUrl: './cotizacion-form.component.html',
    styleUrl: './cotizacion-form.component.css',
    standalone: true
})
export class CotizacionFormComponent {

  @Input() id!: number;
  @ViewChild('addForm') userForm!: NgForm;
  @ViewChild('armazonList') armazonList!: ArmazonListComponent;
  @ViewChild('accesorioList') accesorioList!: AccesorioListComponent;

  readonly titulo_agregar = "Crear cotización";
  readonly titulo_editar = "Editar cotización";
  readonly TITULO_ELIMINAR = 'Eliminar '
  readonly CONFIRMACION_ELIMINAR = '¿Desea eliminar el registro?';
  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly EstatusList = EstatusList;
  readonly Estatus = Estatus;

  estado: Estatus = Estatus.Cargando;

  AddArticulosVisible = false;
  cotizacion: ICotizacion = {} as ICotizacion;
  isEdit = false;
  articulosList: ArticuloCotizacionModel[] = [];
  busquedaTexto = '';

  itemToEdit: { armazon: number; mica: number } | null = null;

  constructor(private service: CotizacionService,
    private toastr: ToastrService,
    private authService: AuthService,
    private sharedService: SharedService,
    private artService: ArticuloCotizacionService) { }

  ngOnInit() {
    this.cargarDatos(this.id);
    this.fetchListaArticulos(this.id);
  }

  onGuardar(form: NgForm): void {
    this.onEditar(form);
  }

  onPrecioCambio() {
    this.cotizacion.usuarioModificacionid = this.authService.user.id
    this.service.Editar(this.cotizacion).subscribe({
      next: (cotizacion) => this.toastr.success('Se actualizo la cotización correctamente'),
      complete: () => {
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }

  cargarDatos(id: number): void {
    this.isEdit = true;
    this.obtenerPorId(id);
  }

  obtenerPorId(id: number): void {
    this.service.GetById(id).subscribe({
      next: (cotizacion) => {this.cotizacion = cotizacion},
      complete: () => { },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

  onEditar(form: NgForm): void {
    if (!form.valid) {
      validarCamposRequeridos(form);
      return;
    }
    this.cotizacion.usuarioModificacionid = this.authService.user.id
    this.service.Editar(this.cotizacion).subscribe({
      next: (cotizacion) => this.toastr.success('Se actualizo la cotización correctamente'),
      complete: () => {
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }

  fetchListaArticulos(id: number): void {
    this.estado = Estatus.Cargando;
    var observable = this.artService.GetAll(id);
    observable.subscribe({
      next: (_articulo: ArticuloCotizacionModel[]) => this.articulosList = _articulo,
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

  UpdateListaArticulos() {
    this.fetchListaArticulos(this.id);
  }

  onAgregarArticulo() {
    this.itemToEdit = null; 
    this.AddArticulosVisible = true;
    //if (this.itemToEdit) {
    //  // Edit the existing item
    //  const index = this.selectedItems.indexOf(this.itemToEdit);
    //  this.selectedItems[index] = newItem;
    //} else {
    //  // Add new item
    //  this.selectedItems.push(newItem);
    //}
    //this.closePopup();
  }

  onEditarArticulo(articulo: ArticuloCotizacionModel) {
    this.itemToEdit = { armazon: articulo.armazonid, mica: articulo.micaid }
    this.AddArticulosVisible = true;
  }

  onEliminarArticulo(articulo: ArticuloCotizacionModel) {
    this.artService.Eliminar(articulo.id).subscribe({
      next: (articulo) => this.fetchListaArticulos(this.id),
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

  closePopup() {
    this.AddArticulosVisible = false;
    this.itemToEdit = null;
  }
}
