using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IAccesorioRepository : IBaseRepository<Accesorio>
    {
        IEnumerable<AccesorioDTO> ConsultarDTO();

        Accesorio ConsultarPorId(int id);
    }
}
