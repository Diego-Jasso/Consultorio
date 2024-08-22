using System.ComponentModel.DataAnnotations;

namespace Consultorio.Server.Models
{
    public class tratamientosServicios
    {
        [Key]
        public int Id { get; set; }
        public string descripcion { get; set; } = string.Empty;
        public float precio { get; set; }
    }
}
