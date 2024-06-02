import { Component, EventEmitter, Output } from '@angular/core';
import { Estatus } from '../../../compartido/utilerias';
import { ICotizacion } from '../../models/cotizacion';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cotizacion-list',
  templateUrl: './cotizacion-list.component.html',
  styleUrl: './cotizacion-list.component.css'
})
export class CotizacionListComponent {

  @Output('editar') agregar: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly Estatus = Estatus;

  estado: Estatus = Estatus.Cargando;
  cotizacionList: ICotizacion[] = [];
  busquedaTexto = '';

  constructor(private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  //  this.fetchLista();
  }

  //onAgregar(): void {
  //  this.router
  //  this.agregar.emit(true);
  //}

}
