export interface ICotizacion {
  cotizacionid: number;
  folio: number;
  statusid: number;
  paciente: string;
  fecha_de_creacion: Date;
  usuarioid: number;
  ultimaModificacion: Date;
  usuarioModificacionid: number;
  precio: number;
  anticipo: number;
  descripcionStatus: string;
  nombreModificacionUsuario: string;
  nombreUsuario: string;
  success: boolean,
  error: string
}
