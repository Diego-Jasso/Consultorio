using Consultorio.Server.Base;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Services
{
    public interface IArticuloCotizacionService:IBaseService<ArticuloCotizacionDTO,ArticuloCotizacionNewDTO>
    {
        List<ArticuloCotizacionDTO> ConsultarDTO(int id);
        ArticuloCotizacionDTO EliminarDTO(int id);
    }
}
