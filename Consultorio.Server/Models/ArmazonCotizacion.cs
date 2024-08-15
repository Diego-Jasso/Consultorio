using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Consultorio.Server.Models
{
    public class ArmazonCotizacion
    {
        [Key]
        public int id { get; set; }
        public int cotizacionid { get; set; }
        public int armazonid { get; set; }
        public int cantidad { get; set; }
        [ForeignKey("cotizacionid")]
        public virtual Cotizacion? Cotizacion { get; set;}
        [ForeignKey("armazonid")]
        public virtual Armazon? Armazon { get; set; }
    }
}
