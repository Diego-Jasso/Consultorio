import { Component } from '@angular/core';
import { ICotizacion } from '../../models/cotizacion';
import { EstatusList } from '../../../compartido/utilerias';

@Component({
  selector: 'app-cotizacion-form',
  templateUrl: './cotizacion-form.component.html',
  styleUrl: './cotizacion-form.component.css'
})
export class CotizacionFormComponent {
  cotizacion: ICotizacion = {} as ICotizacion;
  EstatusList = EstatusList;
}
