using Consultorio.Server.Base;
using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IAccesorioCotizacionRepository : IBaseRepository<AccesorioCotizacion>
    {
        IEnumerable<AccesorioCotizacionDTO> ConsultarDTO(int cotizacionid);
        AccesorioCotizacion ConsultarPorId(int id);
        double ConsultarPrecioTotal(int id);
        AccesorioCotizacion ConsultarPorAccesorioId(int id,int cotid);
    }
}
