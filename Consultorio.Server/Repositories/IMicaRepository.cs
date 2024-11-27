using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IMicaRepository:IBaseRepository<Mica>
    {
        IEnumerable<MicaDTO> ConsultarDTO();
        IEnumerable<MicaDTO> ConsultarDTOConFiltro(string filtro);
        Mica ConsultarPorId(int id);
    }
}
