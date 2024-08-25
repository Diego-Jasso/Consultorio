using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IMicaBifocalRepository:IBaseRepository<micaBifocal>
    {
        IEnumerable<micaBifocalDTO> ConsultarDTO();

        micaBifocal ConsultarPorId(int id);
    }
}
