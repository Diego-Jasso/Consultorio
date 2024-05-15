namespace Consultorio.Server.DTOs
{
    public class MicaDTO
    {
        public string nombre { get; set; } = string.Empty;

        public string descripcion { get; set; } = string.Empty;

        public float precio { get; set; }

        public int cantidad_disponible { get; set; }
    }
}
