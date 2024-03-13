export interface Iarmazon {
  armazonid: number;
  marca: string;
  modelo: string;
  color: string;
  tipo_de_lente: string;
  material: string;
  precio: number;
}

export class armazon implements Iarmazon {
  armazonid!: number;
  marca!: string;
  modelo!: string;
  color!: string;
  tipo_de_lente!: string;
  material!: string;
  precio!: number;

  constructor() { }

}
