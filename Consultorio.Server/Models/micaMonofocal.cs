using System.ComponentModel.DataAnnotations;

namespace Consultorio.Server.Models
{
    public class micaMonofocal
    {
        [Key]
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public string Material { get; set; } = string.Empty;
        public string Tratamiento { get; set; } = string.Empty;
        public string Rango { get; set; } = string.Empty;
        public float Precio { get; set; }
    }
}
