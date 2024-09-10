using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class micaBifocalNewDTO
    {
        public string Marca { get; set; } = string.Empty;
        public float precioDuoDigital { get; set; }
        public float precioFlatTop28 { get; set; }
    }
    public class micaBifocalDTO: micaBifocalNewDTO
    {
        public int Id { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static micaBifocalDTO ToError(string error)
        {
            return new micaBifocalDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
