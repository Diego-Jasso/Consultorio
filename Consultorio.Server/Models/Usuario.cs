using System.ComponentModel.DataAnnotations;

namespace Consultorio.Server.Models
{
    public class Usuario
    {
        [Key]
        public int usuarioid { get; set; }

        public string nombre { get; set; } = string.Empty;

        public string aPaterno { get; set; } = string.Empty;

        public string aMaterno { get; set; } = string.Empty;

        public string nombreUsuario { get; set; } = string.Empty;

        public byte[] passwordHasH { get; set; } = [];

        public byte[] passwordSalt { get; set; } = [];
    }
}
