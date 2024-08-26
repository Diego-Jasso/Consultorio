using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface ILenteDeContactoRepository:IBaseRepository<lenteDeContacto>
    {
        IEnumerable<lenteDeContactoDTO> ConsultarDTO();

        lenteDeContacto ConsultarPorId(int id);
    }
}
