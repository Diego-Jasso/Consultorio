export interface Imica {
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad_disponible: number;
}

export class mica implements Imica {
  micaid!: number;
  nombre!: string;
  descripcion!: string;
  precio!: number;
  cantidad_disponible!: number;

  constructor() { }

}
