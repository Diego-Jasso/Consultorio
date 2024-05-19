using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class MicaNewDTO
    {
        public string nombre { get; set; } = string.Empty;

        public string descripcion { get; set; } = string.Empty;

        public float precio { get; set; }

        public int cantidad_disponible { get; set; }
    }
    public class MicaDTO : MicaNewDTO
    {
        public int micaid { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static MicaDTO ToError(string error)
        {
            return new MicaDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
