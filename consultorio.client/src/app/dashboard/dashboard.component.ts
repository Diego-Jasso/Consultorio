import { Component } from '@angular/core';

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
  { marca: 'AIDEFU 1', modelo: '8838', color: 'NEGRO', tipolente: 'Aro completo', material: 'Acetato/Metal', precio: 550 },
  { marca: 'AIDEFU 1', modelo: '8838', color: 'NEGRO', tipolente: 'Aro completo', material: 'Acetato/Metal', precio: 550 },
  { marca: 'AIDEFU 1', modelo: '8838', color: 'NEGRO', tipolente: 'Aro completo', material: 'Acetato/Metal', precio: 550 },
  { marca: 'AIDEFU 1', modelo: '8838', color: 'NEGRO', tipolente: 'Aro completo', material: 'Acetato/Metal', precio: 550 },
  { marca: 'AIDEFU 1', modelo: '8838', color: 'NEGRO', tipolente: 'Aro completo', material: 'Acetato/Metal', precio: 550 },
  { marca: 'AIDEFU 1', modelo: '8838', color: 'NEGRO', tipolente: 'Aro completo', material: 'Acetato/Metal', precio: 550 },
  { marca: 'AIDEFU 1', modelo: '8838', color: 'NEGRO', tipolente: 'Aro completo', material: 'Acetato/Metal', precio: 550 },
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  displayedColumns: string[] = ['marca', 'modelo', 'color', 'tipolente','material','precio'];
  datasource = Armazones;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}
