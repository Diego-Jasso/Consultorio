using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface ILentesDeContactoRepository:IBaseRepository<lentesDeContacto>
    {
        IEnumerable<lenteDeContactoDTO> ConsultarDTO();

        lentesDeContacto ConsultarPorId(int id);
    }
}
