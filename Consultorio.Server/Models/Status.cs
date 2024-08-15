using System.ComponentModel.DataAnnotations;

namespace Consultorio.Server.Models
{
    public class Status
    {
        [Key]
        public int statusid { get; set; }
        public string descripcion { get; set; } = string.Empty;
    }
}
