using Consultorio.Server.Models;

namespace Consultorio.Server.Services
{
    public interface ITokenServices
    {
        string CrearToken(Usuario usuario);
    }
}
