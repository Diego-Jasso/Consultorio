using System.ComponentModel.DataAnnotations;

namespace Consultorio.Server.Models
{
    public class Mica
    {
        [Key]
        public int Id { get; set; }
        public string tipoMica { get; set; } = string.Empty;
        public string marca { get; set; } = string.Empty;
        public string descripcion { get; set; } = string.Empty;
        public string materialTratamiento { get;set; } = string.Empty;
        public string esfera { get;set; } = string.Empty;
        public string cilindro { get; set; } = string.Empty;
        public string adiciones { get; set; } = string.Empty;
        public float precio { get; set; }
    }
}
