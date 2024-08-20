export interface IArmazonCotizacion {
  id: number;
  cotizacionid: number;
  armazonid: number;
  marca: string;
  modelo: string;
  color: string;
  tipo_de_lente: string;
  material: string;
  precio: number;
}
export interface ArmazonCotizacionModel {
  cotizacionid: number;
  armazonid: number;
  cantidad: number;
}

