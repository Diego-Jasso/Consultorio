using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Consultorio.Server.Models
{
    public class ArticuloCotizacion
    {
        [Key]
        public int id { get; set; }
        public int cotizacionid { get; set; }
        public int armazonid { get; set; }
        public int cantidad { get; set; }
        public string tipoMica { get; set; } = string.Empty;
        public int micaid { get; set; }

        [ForeignKey("cotizacionid")]
        public virtual Cotizacion? Cotizacion { get; set;}
    }
}
