using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class AccesorioNewDTO
    {
        public string descripcion { get; set; } = string.Empty;

        public float precio { get; set; }

        public int cantidad_disponible { get; set; }
    }
    public class AccesorioDTO : AccesorioNewDTO
    {
        public int id { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static AccesorioDTO ToError(string error)
        {
            return new AccesorioDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
