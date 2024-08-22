using System.ComponentModel.DataAnnotations;

namespace Consultorio.Server.Models
{
    public class lentesDeContacto
    {
        [Key]
        public int Id { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public double precio { get; set; }
    }
}
