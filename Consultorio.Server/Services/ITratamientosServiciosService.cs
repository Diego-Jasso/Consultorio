using Consultorio.Server.Base;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Services
{
    public interface ITratamientosServiciosService:IBaseService<tratamientosServiciosDTO, tratamientosServiciosNewDTO>
    {
        tratamientosServiciosDTO EliminarDTO(int id);
    }
}
