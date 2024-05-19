using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Services
{
    public interface ITokenServices
    {
        string CrearToken(UsuarioDTO dto);
    }
}
