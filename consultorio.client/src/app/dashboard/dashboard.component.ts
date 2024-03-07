import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
export interface armazon {
  marca: string;
  modelo: string;
  color: string;
  tipolente: string;
  material: string;
  precio: number;
}

const Armazones: armazon[] = [
  { marca: 'AIDEFU 1', modelo: '8838', color: 'NEGRO', tipolente: 'Aro completo', material: 'Acetato/Metal', precio: 550},
  { marca: 'AIDEFU', modelo: '', color: 'Rosa/rojo', tipolente: 'Aro completo', material: 'Acetato', precio: 550 },
  { marca: 'AIRLOCK', modelo: 'Caliber 203 (046)', color: 'Plata', tipolente: '3 Pzas', material: 'Metal', precio: 3560 },
  { marca: 'ANNE MARII', modelo: 'AP-154 52-17', color: 'Café manchado', tipolente: 'Aro Completo SP', material: 'Metal', precio: 350 },
  { marca: 'AXESS ONE', modelo: '1423 Blue Green', color: 'Azul/verde', tipolente: 'Aro completo', material: 'Acetato', precio: 1390 },
  { marca: 'AXESS KIDS', modelo: '8401 Red Collage', color: 'Negro/Rojo', tipolente: 'Aro completo', material: 'Acetato', precio: 770 },
  { marca: 'AXESS', modelo: '3123 shl gold', color: 'Dorado', tipolente: 'Aro Completo SP', material: 'Metal', precio: 1850 },
  { marca: 'AXESS', modelo: '2731 brown', color: 'cafe', tipolente: 'Aro Completo SP', material: 'Acetato', precio: 1850 },
  { marca: 'AXESS', modelo: '2719 wine', color: 'vino', tipolente: 'Aro Completo SP', material: 'acetato/metal', precio: 1850 },
  { marca: 'AXESS', modelo: '6500 mdemi', color: 'cafe', tipolente: 'Aro Completo SP', material: 'Metal', precio: 1850 },
  { marca: 'AXESS', modelo: '3006 shl gold', color: 'dorado espejeado', tipolente: 'Aro Completo SP', material: 'Metal', precio: 1850 },
  { marca: 'AXESS', modelo: '2709 wine', color: 'vino', tipolente: 'Aro Completo SP', material: 'acetato/metal', precio: 1850 },
  { marca: 'AXESS', modelo: '3006 shlgun', color: 'gris espejeado azul', tipolente: 'Aro Completo SP', material: 'Metal', precio: 1850 },
  { marca: 'AXESS', modelo: '2702', color: 'Negro', tipolente: 'Aro Completo', material: 'TR 39 sp', precio: 1850 },
  { marca: 'AXESS', modelo: '3126 gun', color: 'plateado', tipolente: '3 Pzas', material: 'Metal', precio: 1850 },
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  displayedColumns: string[] = ['actions','marca', 'modelo', 'color', 'tipolente','material','precio'];
  datasource = new MatTableDataSource(Armazones);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}
