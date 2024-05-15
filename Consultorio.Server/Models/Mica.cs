namespace Consultorio.Server.Models
{
    public class Mica
    {
        public int micaid { get; set; }

        public string nombre { get; set; } = string.Empty;

        public string descripcion { get; set; } = string.Empty;

        public float precio { get; set; }

        public int cantidad_disponible { get; set; }
    }
}
