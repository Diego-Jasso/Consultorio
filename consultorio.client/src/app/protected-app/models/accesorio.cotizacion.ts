export interface IAccesorioCotizacion {
  id: number;
  cotizacionid: number;
  accesorioid: number;
  descripcion: string;
  precio: number;
}

export interface AccesorioCotizacionModel {
  cotizacionid: number;
  accesorioid: number;
  cantidad: number;
}
