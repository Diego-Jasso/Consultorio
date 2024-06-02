export interface ICotizacion {
  cotizacionid: number;
  folio: number;
  tipo: number;
  paciente: string;
  fecha_creacion: Date;
  ultima_modificion: Date;
  total: number;
}
