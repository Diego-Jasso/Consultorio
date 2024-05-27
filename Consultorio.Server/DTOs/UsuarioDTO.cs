using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class UsuarioNewDTO
    {
        public string nombre { get; set; } = string.Empty;

        public string aPaterno { get; set; } = string.Empty;

        public string aMaterno { get; set; } = string.Empty;

        public string nombreUsuario { get; set; } = string.Empty;


        public string password { get; set; } = string.Empty ;
    }

    public class UsuarioDTO : UsuarioNewDTO
    {
        public int usuarioid { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;

        public static UsuarioDTO ToError(string error)
        {
            return new UsuarioDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    } 
}
