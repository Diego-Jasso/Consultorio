using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IMicaProgesivoRepository:IBaseRepository<micaProgresivo>
    {
        IEnumerable<micaProgresivoDTO> ConsultarDTO();

        micaProgresivo ConsultarPorId(int id);
    }
}
