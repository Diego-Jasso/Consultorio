namespace Consultorio.Server.Models
{
    public class Armazon
    {
        public int armazonid { get; set; }

        public string marca { get; set; }

        public string modelo { get; set; }

        public string color { get; set; }

        public string tipo_de_lente { get; set; }

        public string material { get; set; }

        public float precio { get; set; }

        public int cantidad_disponible { get; set; }
    }
}
