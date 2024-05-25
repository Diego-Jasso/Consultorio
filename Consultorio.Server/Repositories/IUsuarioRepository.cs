using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IUsuarioRepository: IBaseRepository<Usuario>
    {
        IEnumerable<UsuarioDTO> ConsultarDTO();

        bool ExisteNombreUsuario(int id, string nombreUsuario);
        Usuario ConsultarPorId(int id);
        Usuario ConsultarPorUsuario(string nombreUsuario);
    }
}
