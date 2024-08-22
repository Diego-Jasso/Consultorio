using System.ComponentModel.DataAnnotations;

namespace Consultorio.Server.Models
{
    public class micaBifocal
    {
        [Key]
        public int Id {  get; set; }
        public string Marca { get; set; } = string.Empty;
        public float precioDuoDigital { get; set; }
        public float precioFlatTop28 { get; set; }
    }
}
