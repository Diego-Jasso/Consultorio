using System.ComponentModel.DataAnnotations;

namespace Consultorio.Server.Models
{
    public class micaMonofocal
    {
        [Key]
        public int Id { get; set; }
        public string Material { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public float Precio { get; set; }
    }
}
