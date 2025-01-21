export interface IArticuloCotizacion {
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
export interface ArticuloCotizacionModel {
  id: number;
  marca: string;
  modelo: string;
  color: string;
  tipo_de_lente: string;
  material: string;
  materialTratamiento: string;
  precioArmazon: number;
  precioMica: number;
  descripcionMica: string;
  precioTotal: number;
  cotizacionid: number;
  armazonid: number;
  cantidad: number;
  tipoMica: string;
  micaid: number;
}


