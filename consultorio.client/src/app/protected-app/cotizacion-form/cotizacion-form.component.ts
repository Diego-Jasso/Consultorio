import { Component, EventEmitter, Input, Output, ViewChild,  } from '@angular/core';
import { ICotizacion } from '../models/cotizacion';
import { EstatusList, validarCamposRequeridos } from '../../compartido/utilerias';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CotizacionService } from '../servicios/cotizacion.service';
import { AuthService } from '../../auth/services/auth.service';
import { formatDate } from '@angular/common';
import { SharedService } from '../servicios/shared.service';
import { ArmazonListComponent } from '../armazon/armazon-list/armazon-list.component';
import { AccesorioListComponent } from '../accesorio/accesorio-list/accesorio-list.component';

@Component({
  selector: 'app-cotizacion-form',
  templateUrl: './cotizacion-form.component.html',
  styleUrl: './cotizacion-form.component.css'
})
export class CotizacionFormComponent {

  @Input() id!: number;
  @ViewChild('addForm') userForm!: NgForm;
  @ViewChild('armazonList') armazonList!: ArmazonListComponent;
  @ViewChild('accesorioList') accesorioList!: AccesorioListComponent;

  readonly titulo_agregar = "Crear cotización";
  readonly titulo_editar = "Editar cotización";
  readonly EstatusList = EstatusList;


  showAddLensFramePopup = false;
  cotizacion: ICotizacion = {} as ICotizacion;
  isEdit = false;
  constructor(private service: CotizacionService,
    private toastr: ToastrService,
    private authService: AuthService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.cargarDatos(this.id);
  }
  ngAfterViewInit() {
    this.accesorioList.fetchListaCotizacion(this.id);
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

  itemToEdit: { frame: string; lensType: string } | null = null;

  selectedItems: { frame: string; lensType: string }[] = [];

  onAddLensFrame(newItem: { frame: string; lensType: string }) {
    if (this.itemToEdit) {
      // Edit the existing item
      const index = this.selectedItems.indexOf(this.itemToEdit);
      this.selectedItems[index] = newItem;
    } else {
      // Add new item
      this.selectedItems.push(newItem);
    }
    this.closePopup();
  }

  openAddLensFramePopup() {
    this.itemToEdit = null;  // Reset for new item
    this.showAddLensFramePopup = true;
  }

  openEditLensFramePopup(item: { frame: string; lensType: string }) {
    this.itemToEdit = item;
    this.showAddLensFramePopup = true;
  }

  closePopup() {
    this.showAddLensFramePopup = false;
    this.itemToEdit = null;
  }
}
