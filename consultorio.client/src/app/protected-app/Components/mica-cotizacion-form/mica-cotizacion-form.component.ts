import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-mica-cotizacion-form',
    templateUrl: './mica-cotizacion-form.component.html',
    styleUrl: './mica-cotizacion-form.component.css',
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class MicaCotizacionFormComponent {

  tipoMica: string = "Seleccione un tipo de mica...";


}
