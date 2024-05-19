using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class ArmazonNewDTO
    {
        public string marca { get; set; } = string.Empty;

        public string modelo { get; set; } = string.Empty;

        public string color { get; set; } = string.Empty;

        public string tipo_de_lente { get; set; } = string.Empty;

        public string material { get; set; } = string.Empty;

        public float precio { get; set; }

        public int cantidad_disponible { get; set; }
    }
    public class ArmazonDTO : ArmazonNewDTO
    {
        public int armazonid { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static ArmazonDTO ToError(string error)
        {
            return new ArmazonDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
