using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface ITratamientosServiciosRepository:IBaseRepository<tratamientosServicios>
    {
        IEnumerable<tratamientosServiciosDTO> ConsultarDTO();

        tratamientosServicios ConsultarPorId(int id);
    }
}
