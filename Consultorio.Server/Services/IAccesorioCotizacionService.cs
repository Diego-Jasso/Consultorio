using Consultorio.Server.Base;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Services
{
    public interface IAccesorioCotizacionService:IBaseService<AccesorioCotizacionDTO,AccesorioCotizacionNewDTO>
    {
        List<AccesorioCotizacionDTO> ConsultarDTO(int id);
        AccesorioCotizacionDTO EliminarDTO(int id);
    }
}
