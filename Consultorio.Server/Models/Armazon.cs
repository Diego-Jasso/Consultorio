namespace Consultorio.Server.Models
{
    public class Armazon
    {
        public int armazonid { get; set; }

        public string marca { get; set; } = string.Empty;

        public string modelo { get; set; } = string.Empty;

        public string color { get; set; } = string.Empty;

        public string tipo_de_lente { get; set; } = string.Empty;

        public string material { get; set; } = string.Empty;

        public float precio { get; set; }

        public int cantidad_disponible { get; set; }
    }
}
