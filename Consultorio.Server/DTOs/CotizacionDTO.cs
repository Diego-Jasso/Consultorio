using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class CotizacionNewDTO
    {
        public int folio { get; set; }
        public string paciente { get; set; } = string.Empty;
        public int usuarioid { get; set; }
        public int usuarioModificacionid { get; set; }
        public double precio { get; set; }
        public int statusid { get; set; }
    }
    public class CotizacionDTO: CotizacionNewDTO
    {
        public int cotizacionid { get; set; }
        public DateOnly fecha_de_creacion { get; set; }
        public DateOnly ultimaModificacion { get; set; }
        public string descripcionStatus { get; set; } = string.Empty;
        public string nombreUsuario { get; set; } = string.Empty;
        public string nombreModificacionUsuario { get; set; } = string.Empty;
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static CotizacionDTO ToError(string error)
        {
            return new CotizacionDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
