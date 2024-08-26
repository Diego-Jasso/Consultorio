using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class lenteDeContactoNewDTO
    {
        public string Tipo { get; set; } = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public double precio { get; set; }
    }

    public class lenteDeContactoDTO: lenteDeContactoNewDTO
    {
        public int Id { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static lenteDeContactoDTO ToError(string error)
        {
            return new lenteDeContactoDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
