using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface ICotizacionRepository:IBaseRepository<Cotizacion>
    {
        IEnumerable<CotizacionDTO> ConsultarDTO();
        CotizacionDTO ConsultarPorIdConFK(int id);
        Cotizacion ConsultarPorId(int id);
        int ConsultarFolio();
        
    }
}
