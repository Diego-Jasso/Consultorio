using Consultorio.Server.Base;
using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IArticuloCotizacionRepository:IBaseRepository<ArticuloCotizacion>
    {
        IEnumerable<ArticuloCotizacionDTO> ConsultarDTO(int cotizacionid);
        ArticuloCotizacion ConsultarPorId(int id);
        double ConsultarPrecioTotal(int id);
        ArticuloCotizacion ConsultarPorArmazonId(int id,int cotid);
    }
}
