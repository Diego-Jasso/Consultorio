using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Consultorio.Server.Models
{
    public class AccesorioCotizacion
    {
        [Key]

        public int Id { get; set; }
        public int cotizacionid { get; set; }
        public int accesorioid { get; set; }
        public int cantidad { get; set; }

        [ForeignKey("cotizacionid")]
        public virtual Cotizacion? Cotizacion { get; set; }

        [ForeignKey("accesorioid")]
        public virtual Accesorio? Accesorio { get; set; }

    }
}
