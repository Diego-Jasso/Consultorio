using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class ArmazonCotizacionNewDTO
    {
        public int cotizacionid { get; set; }
        public int armazonid { get; set; }
        public int cantidad { get; set; }
    }
    public class ArmazonCotizacionDTO: ArmazonCotizacionNewDTO
    {
        public int id { get; set; }
        public string marca { get; set; } = string.Empty;
        public string modelo { get; set; } = string.Empty;
        public string color { get; set; } = string.Empty;
        public string tipo_de_lente { get; set; } = string.Empty;
        public string material { get; set; } = string.Empty;
        public double precio { get; set; }
        public double precioTotal { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static ArmazonCotizacionDTO ToError(string error)
        {
            return new ArmazonCotizacionDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
