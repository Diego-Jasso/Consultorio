export interface ICotizacion {
  cotizacionid: number;
  folio: number;
  tipo: number;
  paciente: string;
  fecha_creacion: Date;
  creador: string;
  ultima_modificion: Date;
  usuario_modificacion: string;
  total: number;
}
