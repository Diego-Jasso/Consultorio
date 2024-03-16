export interface Iarmazon {
  marca: string;
  modelo: string;
  color: string;
  tipo_de_lente: string;
  material: string;
  precio: number;
  cantidad_disponible: number;
}

export class armazon implements Iarmazon {
  armazonid!: number;
  marca!: string;
  modelo!: string;
  color!: string;
  tipo_de_lente!: string;
  material!: string;
  precio!: number;
  cantidad_disponible!: number;

  constructor() { }

}
