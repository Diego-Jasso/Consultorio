using System.ComponentModel.DataAnnotations;

namespace Consultorio.Server.Models
{
    public class lenteDeContacto
    {
        [Key]
        public int Id { get; set; }
        public string Tipo { get; set; }   = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public double precio { get; set; }
    }
}
