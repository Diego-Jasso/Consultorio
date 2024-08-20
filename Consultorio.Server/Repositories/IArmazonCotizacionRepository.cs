using Consultorio.Server.Base;
using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IArmazonCotizacionRepository:IBaseRepository<ArmazonCotizacion>
    {
        IEnumerable<ArmazonCotizacionDTO> ConsultarDTO(int cotizacionid);
        ArmazonCotizacion ConsultarPorId(int id);
        double ConsultarPrecioTotal(int id);
    }
}
