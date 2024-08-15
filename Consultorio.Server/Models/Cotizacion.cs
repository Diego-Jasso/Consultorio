using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Consultorio.Server.Models
{
    public class Cotizacion
    {
        [Key]
        public int cotizacionid { get; set; }
        public int folio { get; set; }
        public string paciente { get; set; } = string.Empty;
        public DateOnly fecha_de_creacion { get; set; }
        public int usuarioid { get; set; }
        public DateOnly ultimaModificacion { get; set; }
        public int usuarioModificacionid { get; set; }
        public double precio { get; set; }
        public int statusid { get; set; }
        [ForeignKey("usuarioid")]
        public virtual required Usuario Usuario { get; set; }
        [ForeignKey("usuarioModificacionid")]
        public virtual required Usuario UsuarioMod { get; set; }
        [ForeignKey("statusid")]
        public virtual required Status Status { get; set; }

    }
}
