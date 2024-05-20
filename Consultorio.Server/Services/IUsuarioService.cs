using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Services
{
    public interface IUsuarioService : IBaseService<UsuarioDTO,UsuarioNewDTO>
    {
        UsuarioDTO EliminarDTO(int id);

        bool LoginExitoso(LoginDTO login);


    }
}
