import { Component, ViewChild } from '@angular/core';
import { ICotizacion } from '../models/cotizacion';
import { Router } from '@angular/router';
import { CotizacionService } from '../servicios/cotizacion.service';
import { ToastrService } from 'ngx-toastr';
import { Estatus } from '../../compartido/utilerias';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css'
})
export class CotizacionComponent {

  readonly LOADING_MESSAGE = "Cargando...";
  readonly ERROR_MESSAGE = "Sucedio un error, intentelo más tarde";
  readonly ZERO_RESULTS = "Sin registros";
  readonly Estatus = Estatus;

  estado: Estatus = Estatus.Cargando;
  cotizacionList: ICotizacion[] = [];
  busquedaTexto = '';
  cotizacion: ICotizacion = {} as ICotizacion;

  constructor(private router: Router,
    private toastr: ToastrService,
    private service: CotizacionService,
    private authService: AuthService) { }

  ngOnInit() {
    this.fetchLista();
  }


  fetchLista(): void {
    this.estado = Estatus.Cargando;
    var observable = this.service.GetAll();
    observable.subscribe({
      next: (_cotizacion: ICotizacion[]) => this.cotizacionList = _cotizacion,
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

  onEditar(cotizacion: ICotizacion) {
    this.router.navigateByUrl('layout/cotizacionform/'+cotizacion.cotizacionid);
  }

  onAgregar(): void {
    this.cotizacion.precio = 0;
    this.cotizacion.usuarioid = this.authService.user.id
    this.cotizacion.usuarioModificacionid = this.authService.user.id
    this.service.Agregar(this.cotizacion).subscribe(cot => {
      if (cot.success === true) {
        this.toastr.success('La cotización fue agregada correctamente'),
        this.router.navigateByUrl("/layout/cotizacionform/" + cot.cotizacionid)
      } else {
        this.toastr.error(cot.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }
}