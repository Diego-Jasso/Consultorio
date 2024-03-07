import { Component } from '@angular/core';

export interface armazon {
  cantidad: number,
  marca: string;
  modelo: string;
  color: string;
  tipolente: string;
  material: string;
  precio: number;
}

const Armazones: armazon[] = [
  { cantidad: 2,marca: 'AIDEFU 1', modelo: '8838', color: 'NEGRO', tipolente: 'Aro completo', material: 'Acetato/Metal', precio: 550 },
  { cantidad: 1,marca: 'AIDEFU', modelo: '', color: 'Rosa/rojo', tipolente: 'Aro completo', material: 'Acetato', precio: 550 },
]

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  displayedColumns: string[] = ['cantidad', 'marca', 'modelo', 'color', 'tipolente', 'material', 'precio'];
  footerColumns: string[] = ['material', 'precio'];
  datasource = Armazones;

  getTotalCost() {
    return this.datasource.map(A => A.precio).reduce((acc, value) => acc + value, 0);
  }
}
