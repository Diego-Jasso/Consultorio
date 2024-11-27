using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class MicaNewDTO
    {
        public string tipoMica { get; set; } = string.Empty;
        public string marca { get; set; } = string.Empty;
        public string descripcion { get; set; } = string.Empty;
        public string materialTratamiento { get; set; } = string.Empty;
        public string esfera { get; set; } = string.Empty;
        public string cilindro { get; set; } = string.Empty;
        public string adiciones { get; set; } = string.Empty;
        public float precio { get; set; }
    }
    public class MicaDTO: MicaNewDTO
    {
        public int Id { get; set; }
        public string resumen { get; set; } = string.Empty;
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
