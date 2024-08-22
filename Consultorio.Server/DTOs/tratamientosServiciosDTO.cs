using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class tratamientosServiciosNewDTO
    {
        public string descripcion { get; set; } = string.Empty;
        public float precio { get; set; }
    }
    public class tratamientosServiciosDTO: tratamientosServiciosNewDTO
    {
        public int Id { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static tratamientosServiciosDTO ToError(string error)
        {
            return new tratamientosServiciosDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
