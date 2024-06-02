export interface ICotizacion {
  cotizacionid: number;
  folio: number;
  tipo: number;
  paciente: string;
  fecha: Date;
  ultima_modificion: Date;
  total: number;
}
