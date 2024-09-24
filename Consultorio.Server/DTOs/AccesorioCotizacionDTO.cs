using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class AccesorioCotizacionNewDTO
    {
        public int cotizacionid { get; set; }
        public int accesorioid { get; set; }
        public int cantidad { get; set; }
    }
    public class AccesorioCotizacionDTO : AccesorioCotizacionNewDTO
    {
        public int id { get; set; }
        public string descripcion { get; set; } = string.Empty;
        public double precio { get; set; }
        public double precioTotal { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static AccesorioCotizacionDTO ToError(string error)
        {
            return new AccesorioCotizacionDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
