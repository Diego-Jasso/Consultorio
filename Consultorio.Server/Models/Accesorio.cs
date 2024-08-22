namespace Consultorio.Server.Models
{
    public class Accesorio
    {
        public int id { get; set; }

        public string descripcion { get; set; } = string.Empty;

        public float precio { get; set; }

        public int cantidad_disponible { get; set; }
    }
}
