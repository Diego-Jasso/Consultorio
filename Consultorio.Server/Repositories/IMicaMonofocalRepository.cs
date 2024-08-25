using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IMicaMonofocalRepository: IBaseRepository<micaMonofocal>
    {
        IEnumerable<micaMonofocalDTO> ConsultarDTO();

        micaMonofocal ConsultarPorId(int id);
    }
}
